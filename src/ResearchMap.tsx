import { useEffect, useMemo, useState } from 'react'
import { ReactFlow, useNodesState, Background, Controls, MiniMap, Handle, Position, MarkerType, type NodeProps, type Node, type Edge } from '@xyflow/react'
import { List, Network, ArrowUpRight, Maximize2, Minimize2 } from 'lucide-react'
import '@xyflow/react/dist/style.css'
import { type Paper, type Relation, groups, relations, matchesCategory, colorFor, name, text, categoryById } from './data'

type PaperNodeData = { paper: Paper; color: string; open: (p: Paper) => void }
function PaperNode({data}: NodeProps<Node<PaperNodeData>>) {
  const p = data.paper
  return <div className={`map-paper ${p.scope === 'context_only' ? 'context-node' : ''}`} style={{borderTopColor: data.color}}>
    <Handle type="target" position={Position.Left} />
    <button className="nodrag map-paper-button" onClick={() => data.open(p)} aria-label={`查看论文 ${name(p)}`}>
      <span className="node-meta"><span>{text(p.year)} · {text(p.venue)}</span><ArrowUpRight size={15}/></span>
      <strong>{name(p)}</strong><p>{p.main_contribution ?? 'N/A'}</p>
      <span className="node-foot"><span>{p.scope === 'context_only' ? '离散背景' : `${p.categories.length} 个研究标签`}</span><span className={!p.verified ? 'uncertain' : ''}>{p.verified ? '核心已核实' : '待核实'}</span></span>
    </button><Handle type="source" position={Position.Right} />
  </div>
}
function HeadingNode({ data }: NodeProps) { return <div className="lane-heading" style={{color: String(data.color)}}><span>{String(data.number)}</span><strong>{String(data.label)}</strong><small>排布 {String(data.count)} 篇</small></div> }
const nodeTypes = { paper: PaperNode, heading: HeadingNode }

export default function ResearchMap({ items, category, open, dark }: { items: Paper[]; category: string; open: (p: Paper) => void; dark: boolean }) {
  const [outline, setOutline] = useState(false)
  const [full, setFull] = useState(false)
  const [evidence, setEvidence] = useState('all')
  const [edgeInfo, setEdgeInfo] = useState<Relation | null>(null)
  const graph = useMemo(() => {
    const visible = items.filter(p => matchesCategory(p, category))
    const lanes = category === 'all' ? groups : [{id: category,label: categoryById[category]?.label ?? category}]
    const buckets: Paper[][] = lanes.map(() => [])
    // A single canonical node per paper. Balancing is presentation only; every category remains searchable.
    const sorted = [...visible].sort((a,b) => (a.year ?? 0)-(b.year ?? 0) || name(a).localeCompare(name(b)))
    sorted.forEach(p => {
      const eligible = lanes.map((g,i) => ({i, match: matchesCategory(p,g.id)})).filter(x => x.match)
      const lane = eligible.sort((a,b) => buckets[a.i].length-buckets[b.i].length)[0]?.i ?? 0
      buckets[lane].push(p)
    })
    const nodes: Node[] = []
    lanes.forEach((lane,i) => {
      const n = buckets[i]
      nodes.push({ id: `heading-${lane.id}`, type:'heading', position:{x:i*320,y:0},data:{label:lane.label,color:colorFor(lane.id),count:n.length,number:String(i+1).padStart(2,'0')},draggable:false,selectable:false,focusable:false })
      n.forEach((p,j) => nodes.push({id:p.id,type:'paper',position:{x:category === 'all' ? i*320 : (j%3)*320,y:100+(category === 'all' ? j : Math.floor(j/3))*210},data:{paper:p,color:colorFor(lane.id),open},draggable:false}))
    })
    const ids = new Set(visible.map(p => p.id))
    const edges: Edge[] = relations.filter(r => ids.has(r.source) && ids.has(r.target) && (evidence==='all' || r.evidence_level===evidence)).map(r => ({id:r.id,source:r.source,target:r.target,type:'default',style:{stroke:r.verified ? '#638783' : '#9c8eaf',strokeWidth:1.6,strokeDasharray:r.verified ? undefined : '6 5'},markerEnd:{type:MarkerType.ArrowClosed,color:r.verified ? '#638783' : '#9c8eaf'},interactionWidth:22,ariaLabel:`${r.source} → ${r.target}: ${r.type}`,data:{relation:r}}))
    return {nodes,edges,visible}
  },[items,category,open,evidence])
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes)
  useEffect(() => setNodes(graph.nodes), [graph.nodes, setNodes])
  return <div className={`map-shell ${full ? 'map-expanded' : ''}`}>
    <div className="map-toolbar"><div className="segmented"><button className={!outline?'active':''} onClick={()=>setOutline(false)}><Network size={15}/> 图谱</button><button className={outline?'active':''} onClick={()=>setOutline(true)}><List size={15}/> 大纲</button></div><span className="map-count">{graph.visible.length} 篇 · {graph.edges.length} 条关系</span><label className="edge-select"><span className="sr-only">关系证据</span><select aria-label="关系证据" value={evidence} onChange={e=>{setEvidence(e.target.value);setEdgeInfo(null)}}><option value="all">全部关系</option><option value="explicit">仅直接证据</option><option value="editorial">仅编辑性演化</option></select></label><button className="icon-button" onClick={()=>setFull(!full)} aria-label={full?'退出展开地图':'展开地图'}>{full?<Minimize2 size={17}/>:<Maximize2 size={17}/>}</button></div>
    {outline ? <div className="map-outline">{graph.visible.length ? graph.visible.map(p=><button key={p.id} onClick={()=>open(p)}><span>{text(p.year)}</span><strong>{name(p)}</strong><span>{p.main_contribution ?? 'N/A'}</span><ArrowUpRight size={16}/></button>) : <p className="empty">没有匹配论文。请更换分类或搜索条件。</p>}</div> : <div className="graph-canvas">
      <ReactFlow key={`${category}-${items.map(p=>p.id).join(',')}`} nodes={nodes} onNodesChange={onNodesChange} edges={graph.edges} nodeTypes={nodeTypes} defaultViewport={{x:24,y:24,zoom:category==='all' ? .78 : .8}} minZoom={.2} maxZoom={1.7} colorMode={dark?'dark':'light'} nodesConnectable={false} nodesDraggable={false} deleteKeyCode={null} onEdgeClick={(_,e)=>setEdgeInfo(e.data?.relation as Relation)} onPaneClick={()=>setEdgeInfo(null)} zoomOnScroll={false} panOnScroll={false} onNodeClick={(_,n)=>{if(n.type==='paper')open((n.data as PaperNodeData).paper)}}>
        <Background gap={24} size={1} color={dark?'#314047':'#d9e2df'}/><Controls showInteractive={false}/><MiniMap nodeColor={n=>n.type==='paper'?String(n.data.color):'transparent'} maskColor={dark?'#0e171dba':'#eef3f3b8'} pannable zoomable/>
      </ReactFlow>{!graph.visible.length&&<p className="map-empty">没有匹配论文。请更换分类或搜索条件。</p>}
      {edgeInfo&&<div className="edge-detail"><button className="edge-close" onClick={()=>setEdgeInfo(null)} aria-label="关闭关系详情">×</button><strong>{edgeInfo.type.replaceAll('_',' ')}</strong><p>{edgeInfo.rationale}</p><small>{edgeInfo.verified?'直接证据':'编辑性研究演化 · 非直接继承'} · verified: {String(edgeInfo.verified)}</small>{edgeInfo.verification_sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">关系来源 ↗</a>)}</div>}
    </div>}
    <div className="map-footer"><span><i className="line-key"/> 直接证据</span><span><i className="line-key dashed"/> 编辑性演化</span><span className="map-hint">拖动平移 · 双击放大 · 右下角定位</span></div><p className="map-note">节点按研究方向均衡排布，每篇只显示一次；布局不代表唯一分类或时间继承。选择方向可查看全部交叉分类论文。</p>
  </div>
}

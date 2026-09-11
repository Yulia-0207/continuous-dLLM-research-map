import { type Paper, byId, relations, name, readable } from './data'
export function PaperStory({p}:{p:Paper}) {
  return <div className="paper-story"><section><h4>MOTIVATION / PROBLEM</h4><p>{p.main_problem ?? 'N/A'}</p></section><section><h4>SOLUTION</h4><p>{p.method_summary ?? 'N/A'}</p></section></div>
}
export function PaperEvolution({p,open,ids}:{p:Paper;open:(p:Paper)=>void;ids?:Set<string>}) {
  const links=relations.filter(r=>(r.source===p.id||r.target===p.id)&&(!ids||(ids.has(r.source)&&ids.has(r.target))))
  return links.length?<div className="story-relations">{links.map(r=><button key={r.id} onClick={()=>open(byId[r.source===p.id?r.target:r.source])} title={r.rationale}>{name(byId[r.source])} → {name(byId[r.target])}<small>{readable(r.type)} · {r.evidence_level==='explicit'?'直接证据':'编辑性演化'}</small></button>)}</div>:null
}
export function RouteEvolution({items,open}:{items:Paper[];open:(p:Paper)=>void}) {
 const ids=new Set(items.map(p=>p.id));const links=relations.filter(r=>ids.has(r.source)&&ids.has(r.target))
 return <div className="route-evolution"><h4>已记录的演进关系</h4>{links.length?links.map(r=><details key={r.id}><summary><span>{name(byId[r.source])} → {name(byId[r.target])}</span><small>{readable(r.type)} · {r.evidence_level==='explicit'?'直接证据':'编辑性演化'}</small></summary><p>{r.rationale}</p><div><button onClick={()=>open(byId[r.source])}>阅读 {name(byId[r.source])} ↗</button><button onClick={()=>open(byId[r.target])}>阅读 {name(byId[r.target])} ↗</button></div></details>):<p>当前数据未记录该路线内的论文关系。下面按时间展示方法，不据此推断继承。</p>}</div>
}

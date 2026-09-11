import paperData from '../data/papers.json'
import taxonomyData from '../data/taxonomy.json'
import relationData from '../data/relations.json'

export interface Paper {
  id: string; alias: string[]; title: string; year: number | null; venue: string | null;
  publication_status: string | null; publication_year: number | null; authors: string[];
  paper_url: string | null; code_url: string | null; project_url: string | null;
  categories: string[]; state_space: string | null; representation_unit: string | null;
  generation_type: string | null; decoder_type: string | null; model_scale: Record<string, unknown> | null;
  main_problem: string | null; main_contribution: string | null; method_summary: string | null;
  inference_focus: string | null; efficiency_mechanism: Record<string, string[] | null> | null;
  evaluation_metrics: string[] | null; tags: string[]; verified: boolean; pending_verification: string[];
  verification_sources: {url: string; type: string; locator: string | null; supports: string[]; accessed_at: string; url_check?: Record<string, unknown>}[];
  verification_level: string; verification_note: string; first_submission_date: string | null;
  scope: string; systems_evidence: Record<string, unknown> | null; time_parameterization: string | null;
}
export const papers = paperData as Paper[]
export const taxonomy = taxonomyData
export const categories = taxonomy.categories
export const groups = categories.filter(c => !c.parent_id)
export const relations = relationData.relations
export type Relation = typeof relations[number]
export const corePapers = papers.filter(p => p.scope === 'core')
export const byId = Object.fromEntries(papers.map(p => [p.id, p]))
export const categoryById = Object.fromEntries(categories.map(c => [c.id, c]))
const palette = ['#137e73', '#5864c7', '#b77827', '#b7587c', '#8a5db5', '#3976ad']
export const colorFor = (id: string) => palette[Math.max(0, groups.findIndex(g => g.id === id.split('.')[0])) % palette.length]
export const matchesCategory = (p: Paper, c: string) => c === 'all' || p.categories.some(id => id === c || id.startsWith(c + '.'))
export const name = (p: Paper) => p.alias[0] || p.title
export const text = (value: unknown): string => value === null || value === undefined || value === '' ? 'N/A' : Array.isArray(value) ? value.length ? value.map(text).join(' · ') : 'N/A' : typeof value === 'object' ? Object.entries(value).map(([k,v]) => `${k}: ${text(v)}`).join('\n') : String(value)
export const readable = (v: unknown) => text(v).replaceAll('_', ' ')
export const statusLabel = (p: Paper) => ({published:'正式发表',accepted:'已录用',arxiv_preprint:'arXiv 预印本'}[p.publication_status || ''] || 'N/A')
export const hasEfficiency = (p: Paper, axis: string) => Boolean(p.efficiency_mechanism?.[axis]?.length)
export const years = [...new Set(papers.map(p => p.year).filter((y): y is number => y !== null))].sort((a,b) => b-a)

"""Collect source metadata only; never promote candidates into papers.json."""
import datetime as dt
import json
import os
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
WINDOW = 30
NS = {'a': 'http://www.w3.org/2005/Atom'}
QUERY = '(all:"diffusion" OR all:"flow matching" OR all:"flow map") AND (all:"language" OR all:"text generation") AND (all:"continuous" OR all:"latent" OR all:"embedding" OR all:"bitstream")'
SYSTEMS = re.compile(r'\b(kernel|cuda|triton|serving|scheduling|gpu|latency|throughput|memory)\b', re.I)
CONTINUOUS = re.compile(r'continuous[ -](?:state|space|diffusion|representation)|latent diffusion|embedding[ -]space|analog bits|bitstream|flow matching|flow map', re.I)

def fetch(url):
    headers = {'User-Agent': 'Continuous-dLLM-Atlas/1.0 (https://github.com/Yulia-0207/continuous-dLLM-research-map)'}
    if urllib.parse.urlparse(url).hostname == 'api.github.com':
        headers['Accept'] = 'application/vnd.github+json'
        if os.getenv('GH_TOKEN'):
            headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=25) as response:
        return response.read()

def candidate(title, abstract):
    body = title + ' ' + abstract
    language_task = re.search(r'language (model|generation|diffusion)|text (generation|diffusion|modeling)|diffusion (language|for text)|generating text', body, re.I)
    off_topic = re.search(r'vision|visual|robot|motion generation|chest x.ray|image|video|speech|audio|codec|voice|mmwave', title, re.I)
    title_signal = re.search(r'\blanguage\b|\btext\b|\b[dl]*ll?ms?\b|\bdlm|token embeddings|categorical generation', title, re.I)
    return bool(CONTINUOUS.search(body) and language_task and title_signal and not off_topic)

def canonical_arxiv(url):
    match = re.search(r'(\d{4}\.\d{4,5})(?:v\d+)?', url)
    return match[1] if match else None

def in_window(date, now):
    try:
        value = dt.datetime.fromisoformat(date.replace('Z', '+00:00'))
        return now-dt.timedelta(days=WINDOW) <= value <= now
    except (ValueError, TypeError):
        return False

def merge_items(old, new, now):
    result = {i['id']: i for i in old + new if in_window(i['date'], now)}
    return sorted(result.values(), key=lambda i: (i['date'], i['id']), reverse=True)[:200]

def collect():
    now = dt.datetime.now(dt.timezone.utc)
    papers = json.loads((ROOT/'data/papers.json').read_text())
    output = ROOT/'data/briefs.json'
    previous = json.loads(output.read_text()) if output.exists() else {'items': []}
    sources, items = [], []
    known = {canonical_arxiv(p['paper_url'] or '') for p in papers}
    url = 'https://export.arxiv.org/api/query?' + urllib.parse.urlencode({'search_query': QUERY, 'max_results': 100, 'sortBy': 'lastUpdatedDate', 'sortOrder': 'descending'})
    source = {'name': 'arXiv · continuous language diffusion / flow', 'url': url, 'status': 'ok', 'count': 0}
    try:
        root = ET.fromstring(fetch(url))
        for entry in root.findall('a:entry', NS):
            read = lambda field: ' '.join((entry.findtext('a:'+field, default='', namespaces=NS)).split())
            title, abstract, date, link = read('title'), read('summary'), read('updated'), read('id')
            if 'api/errors' in link:
                raise ValueError('arXiv returned an API error')
            ident = canonical_arxiv(link)
            if not ident or not in_window(date, now) or not candidate(title, abstract):
                continue
            items.append({'id': 'arxiv:'+ident, 'kind': 'paper', 'title': title, 'url': 'https://arxiv.org/abs/'+ident,
                          'date': date, 'summary': '摘要关键词匹配：连续状态 / 表示、latent 或 flow，以及语言 / 文本生成。请打开原论文核查研究范围和方法。',
                          'reason': ('已收录论文的近期版本线索' if ident in known else '新候选论文，尚未纳入已核实论文库')+'；日期为 arXiv updated，非正式发表日期。',
                          'systems_signal': bool(SYSTEMS.search(title+' '+abstract)), 'review_status': 'unreviewed', 'source': source['name']})
            source['count'] += 1
    except (urllib.error.URLError, TimeoutError, ET.ParseError, ValueError, OSError) as error:
        source.update(status='error', error=type(error).__name__ + (': HTTP '+str(error.code) if isinstance(error, urllib.error.HTTPError) else '：未能获取有效响应'))
    sources.append(source)
    repos = set()
    for paper in papers:
        if paper.get('scope') != 'core':
            continue
        parsed = urllib.parse.urlparse(paper.get('code_url') or '')
        parts = parsed.path.strip('/').split('/')
        if parsed.hostname == 'github.com' and len(parts) >= 2:
            repos.add('/'.join(parts[:2]))
    for repo in sorted(repos):
        source = {'name': repo, 'url': 'https://github.com/'+repo, 'status': 'ok', 'count': 0}
        try:
            base = 'https://api.github.com/repos/'+repo
            releases = json.loads(fetch(base+'/releases?per_page=5'))
            commits = json.loads(fetch(base+'/commits?'+urllib.parse.urlencode({'per_page': 3, 'since': (now-dt.timedelta(days=WINDOW)).isoformat()})))
            events = []
            for r in releases:
                if not r.get('draft'):
                    events.append(('release:'+str(r['id']), r.get('published_at'), r['html_url'], r.get('name') or r['tag_name'], 'Release：请查看官方发布说明。'))
            for c in commits:
                events.append(('commit:'+c['sha'], c['commit']['committer']['date'], c['html_url'], c['commit']['message'].split('\n')[0], 'Commit：代码活动不等于新论文或已验证的系统改进。'))
            for ident, date, link, title, summary in events:
                if not date or not in_window(date, now):
                    continue
                items.append({'id': repo+':'+ident, 'kind': 'github', 'title': repo+' · '+title[:200], 'url': link, 'date': date,
                              'summary': summary, 'reason': '监测已收录连续 / 混合论文的官方仓库；单次最多 5 个 release、3 个 commit。',
                              'systems_signal': bool(SYSTEMS.search(title)), 'review_status': 'unreviewed', 'source': repo})
                source['count'] += 1
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError, OSError) as error:
            source.update(status='error', error=type(error).__name__ + (': HTTP '+str(error.code) if isinstance(error, urllib.error.HTTPError) else '：未能获取有效响应'))
        sources.append(source)
    result = {'generated_at': now.isoformat(), 'window_days': WINDOW, 'sources': sources, 'items': merge_items(previous['items'], items, now)}
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
    print(f"Collected {len(items)} candidates; {sum(s['status']=='ok' for s in sources)}/{len(sources)} sources available.")

if __name__ == '__main__':
    collect()

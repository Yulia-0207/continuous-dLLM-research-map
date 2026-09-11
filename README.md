# Continuous dLLM Atlas

React + TypeScript + Vite + Tailwind CSS + React Flow 的静态研究地图。研究内容直接导入 `data/` 中的 JSON，无后端、无远程论文 API。

## 本地运行

需要 Node.js 20.19+。

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

生产文件位于 `dist/`。`vite.config.ts` 使用 `base: './'`，模块导航使用 hash，因此可放在 GitHub Pages 仓库子路径下，无需 SPA rewrite。无需修改原始数据。部署前执行 build，发布整个 `dist/`。

## GitHub Pages

已提供 `.github/workflows/pages.yml`，在推送到 `main` 时自动构建并发布，也支持在 Actions 中手动运行。

1. 将本项目目录的内容放在目标仓库根目录（包括 `.github/`，不上传 `node_modules/` 或 `dist/`）。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。
3. 推送到 `main`，在 Actions 中查看 Deploy atlas to GitHub Pages 的结果；若先推送后启用 Pages，可手动运行工作流。
4. 发布成功后，在 Settings → Pages 或工作流的 deployment 链接打开实际网址。一般形式为 `https://<用户名>.github.io/<仓库名>/`。

工作流使用 Node.js 22、`npm ci` 和 `npm run build`，仅发布生成的 `dist/`。如果将项目保留在仓库子目录中，需将工作流移至仓库根目录的 `.github/workflows/`，并相应设置工作目录、缓存 lockfile 路径与产物路径。

部署机制参考 [GitHub 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。仅添加此配置不会产生公网网址，仍须将文件推送到 GitHub 并成功执行部署。

## 数据与显示规则

- 所有论文、分类、关系、计数来自现有 JSON。UI 不修改数据。
- 多标签分类使用包含关系匹配，父分类也命中其子分类。
- 研究地图每篇只创建一个节点；按可匹配方向均衡分配位置仅用于布局，不赋予唯一分类。选中一个方向可查看全部匹配论文。
- 图中实线为直接证据，虚线为编辑性演化；点击连线可查看依据。图谱可平移、缩放、展开，也可切换为键盘友好的大纲。
- 默认排除 `context_only` 离散背景，可显式开启。全部模块继承当前筛选。
- 空值显示 N/A，保留完整核实备注、证据来源、发表状态和规模范围。
- 统计按唯一 paper id 计数；多标签类别与效率轴可重叠，不能将柱状图相加作为论文总数。
- 架构效率、算法效率、GPU 测量分开呈现。没有记录的系统类别只标为当前数据中 relatively underexplored。

原始研究范围与来源见 `PROJECT_SPEC.md`、`REFERENCES.md`。

## 阅读结构与 Daily Brief

首页默认 Timeline，按首次公开年份阅读 Motivation / Problem、Solution，以及已有的前序和后续关系。问题部分来自 `main_problem`，没有另行推断动机；Technical Routes 同时展示路线问题、已有关系及子方向。Evolution Map 保留可交互关系图，原论文数据与核实规则不变。

Daily Brief 独立读取 `data/briefs.json`。`.github/workflows/daily-brief.yml` 每天 UTC 01:17（北京时间 09:17）计划运行，也可在 Actions 手动运行。它用 Python 标准库访问 arXiv 官方 Atom API 和已收录核心论文的官方 GitHub 仓库，无需付费模型密钥，工作流使用内置 `github.token` 读取公开仓库并提交简报。

- arXiv 最多获取按更新时间排序的 100 条检索结果，再用语言生成任务和连续表示关键词筛选；回看 30 天。匹配存在误报和漏报，不自动新增论文、改 venue 或推断继承。
- GitHub 每个仓库最多读取 5 个 release、3 个最近 commit。Systems 只表示标题/摘要或提交标题命中 GPU、kernel、latency 等词，不表示已经核实的系统创新。当前监测范围不包括整个系统软件生态。
- 新论文与已有论文的新版本均标为待核实。论文候选显示链接与匹配原因，不自动生成未经核实的 Motivation / Solution。正式扩充论文库仍需人工核实。
- 单个来源失败会记录错误，并保留 30 天窗口内已有线索；最多保留 200 条。来源状态和运行时间直接显示在页面。仅更新简报文件，不触碰三个研究 JSON。
- 提交简报后显式调用 Pages 可复用工作流重新部署，避免内置 token 的 push 不触发下一次工作流的问题。
- GitHub 定时任务可能延迟；公开仓库长期无活动时可能被暂停。可在 Actions → Daily Brief 检查并重新启用。仓库需允许 Actions 写入内容，且 main 分支保护规则需允许此更新方式；若组织规则禁止机器人推送，任务会明确失败。

本地验证：`python3 -m unittest discover -s scripts -p 'test_*.py'`。手动采集：`python3 scripts/update_brief.py`；未提供 `GH_TOKEN` 时读取公开 API，但限额较低。

来源文档：[arXiv API](https://info.arxiv.org/help/api/user-manual.html)、[GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)、[GitHub Releases API](https://docs.github.com/en/rest/releases/releases)。

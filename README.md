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

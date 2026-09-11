# REFERENCES — Continuous dLLM Research Map

核实日期：2026-09-11。共 32 篇唯一论文；30 篇 core，2 篇 context_only。以下摘要和分类为编辑性整理，论文结论没有独立复现。

## 来源与核实规则

原论文 → 正式论文集 / 作者官方项目 → 官方代码仓库。检索中的二手文章仅用于定位，不作为事实证据。arXiv 与正式版本共用 paper id；year 是最早已核实的年份，publication_year 是正式发表年份。arxiv_preprint 表示本轮仅确认预印本，不代表证明它从未被录用。null 表示未确认，不是零、不存在或不适用。

verified=true 仅表示论文身份与核心方法有一手证据；字段完整性请读 pending_verification。TTCD 因原文冲突标 false。所有 model_scale 都附范围和来源；不补猜未读出的规模。results 全部为 null，本轮不建立未经逐表审计的性能排名。

## 参考网站的组织方式

[DFlash Atlas 参考网站](https://joelulu.github.io/Awesome-Parallel-Speculative-Decoding/#research-map) 的网页与脚本已读取。其地图采用问题分支、时间演进、类别图例、方法卡片和可展开大纲，且明确说明时间连线不是继承关系。本项目复用组织思路；relations 中直接继承与编辑性问题演化分开。

## 特别核实事项

- TTCD：arXiv ID 2607.14106 的原始页面日期为 2026-05-07，且正文同时出现 100M、160M；first_submission_date / model_scale 置 null。year=2026 不受影响。
- CoBit：arXiv 2605.07013 v2 改名；用户所列 Continuous Bitstream Diffusion 为同一论文旧题名，不重复收录。
- BitLM：正文与 Table 1 的 ROUGE 数字不一致；只记录指标名称和 §4 规模，不录入结果或速度倍数。
- PlaidQ：原文给出的仓库 `github.com/pengzhangzhi/plaidq` 返回 HTTP 404，code_url 置 null；论文来源有效。
- CANDI：作者出版列表与会议目录支持 ICML 2026，暂记 accepted；正式论文集条目尚待核实。CADD 已核到 ICLR 2026 正式论文集。
- CoBit Appendix F：固定 128 NFE、GH200、BF16、合成输入的 GPU 内存/吞吐证据；不等于 serving、专用 kernel 或硬件 co-design。
- 未核实独立项目页、代码、模型规模或指标的条目均保留 null，并在下方逐项列出。

## Diffusion-LM — `diffusion-lm`

Diffusion-LM Improves Controllable Text Generation

年份：2022；正式发表年：2022；venue：NeurIPS；状态：published；scope：core。

核心核实：True；分类：representation.embedding, decoder.readout, decoder.rounding。

原始来源：

- [original_paper](https://arxiv.org/abs/2205.14217) — Abstract; method sections where noted
- [official_publication](https://proceedings.neurips.cc/paper_files/paper/2022/hash/1be5bc25d50895ee656b8c2d9eb89d6a-Abstract.html) — publication_status, venue

待核实：

- model_scale：尚未逐配置核实，保留 null
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## DiffuSeq — `diffuseq`

DiffuSeq: Sequence to Sequence Text Generation with Diffusion Models

年份：2022；正式发表年：2023；venue：ICLR；状态：published；scope：core。

核心核实：True；分类：representation.embedding, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2210.08933) — Abstract; method sections where noted
- [official_code](https://github.com/Shark-NLP/DiffuSeq) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## SSD-LM — `ssd-lm`

SSD-LM: Semi-autoregressive Simplex-based Diffusion Language Model for Text Generation and Modular Control

年份：2022；正式发表年：2023；venue：ACL；状态：published；scope：core。

核心核实：True；分类：representation.categorical, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2210.17432) — Abstract; method sections where noted
- [official_publication](https://aclanthology.org/2023.acl-long.647/) — publication_status, venue

待核实：

- simplex 是方法命名；带噪 logits 不应强行解释为始终满足概率单纯形约束。
- model_scale：尚未逐配置核实，保留 null
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## CDCD — `cdcd`

Continuous diffusion for categorical data

年份：2022；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, learning.objective, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2211.15089) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2211.15089) — §3.1–3.3

待核实：

- 不能因 categorical 标题就将带噪状态标为 simplex；正式发表状态未找到确认。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## Plaid — `plaid`

Likelihood-Based Diffusion Language Models

年份：2023；正式发表年：2023；venue：NeurIPS；状态：published；scope：core。

核心核实：True；分类：representation.embedding, learning.objective, learning.scaling, learning.large_scale, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2305.18619) — Abstract; method sections where noted
- [official_publication](https://papers.nips.cc/paper_files/paper/2023/file/35b5c175e139bff5f22a5361270fce87-Paper-Conference.pdf) — publication_status, venue
- [official_code](https://github.com/igul222/plaid) — code_identity

待核实：

- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## DiffuSeq-v2 — `diffuseq-v2`

DiffuSeq-v2: Bridging Discrete and Continuous Text Spaces for Accelerated Seq2Seq Diffusion Models

年份：2023；正式发表年：2023；venue：Findings of EMNLP；状态：published；scope：core。

核心核实：True；分类：representation.embedding, sampling.few_step, hybrid.other, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2310.05793) — Abstract; method sections where noted
- [official_publication](https://aclanthology.org/2023.findings-emnlp.660/) — publication_status, venue
- [official_code](https://github.com/Shark-NLP/DiffuSeq) — code_identity

待核实：

- soft absorbing state 属于边界型混合；与 CADD 的 paired latent 机制不同。
- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## FlowSeq — `flowseq`

Flow Matching for Conditional Text Generation in a Few Sampling Steps

年份：2024；正式发表年：2024；venue：EACL (Short Papers)；状态：published；scope：core。

核心核实：True；分类：representation.embedding, sampling.few_step, sampling.one_step, learning.objective, systems.algorithmic。

原始来源：

- [official_publication](https://aclanthology.org/2024.eacl-short.33/) — publication_status, venue
- [official_code](https://github.com/dongzhuoyao/flowseq) — code_identity

待核实：

- 本条是 EACL 2024 FlowSeq，不是 2019 同名 normalizing-flow seq2seq 论文。
- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## RDLM — `rdlm`

Continuous Diffusion Model for Language Modeling

年份：2025；正式发表年：2025；venue：NeurIPS；状态：published；scope：core。

核心核实：True；分类：representation.categorical, learning.objective, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2502.11564) — Abstract; method sections where noted
- [official_publication](https://proceedings.neurips.cc/paper_files/paper/2025/file/8c4046a93293442e88f54e19a5849d68-Paper-Conference.pdf) — publication_status, venue
- [official_code](https://github.com/harryjo97/RDLM) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## LangFlow — `langflow`

LangFlow: Continuous Diffusion Rivals Discrete in Language Modeling

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, learning.objective, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2604.11748) — Abstract; method sections where noted
- [official_code](https://github.com/nealchen2003/LangFlow) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 独立官方 project_url 未核到，保留 null

## ELF — `elf`

ELF: Embedded Language Flows

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, representation.latent, learning.objective, sampling.few_step, sampling.distillation, decoder.readout, decoder.learned, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.10938) — Abstract; method sections where noted
- [official_code](https://github.com/lillian039/ELF) — code_identity
- [official_project](https://linlu-qiu.github.io/assets/html/elf_pd.html) — project_identity
- [original_paper](https://arxiv.org/html/2605.10938v2) — §3, §4.1 and Appendix B

待核实：

- 覆盖 contextual 与 non-contextual embedding 消融；主配置不是压缩 VAE，不应统一标为 VAE decoder。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用

## RePlaid — `replaid`

Continuous Diffusion Scales Competitively with Discrete Diffusion for Language

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, learning.objective, learning.scaling, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.18530) — Abstract; method sections where noted
- [official_project](https://research.nvidia.com/labs/genair/replaid/) — project_identity
- [original_paper](https://arxiv.org/html/2605.18530) — Method / experiments; special conflicts described in pending_verification

待核实：

- 采用 2026-09-09 的 v2 元数据；不同版本结果不能混用。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null

## DSL-LLaDA — `dsl-llada`

DSL-LLaDA: Scaling Continuous Denoising to 8B Masked Diffusion LMs

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, learning.adaptation, learning.large_scale, sampling.few_step, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2606.01024) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2606.01024) — Method / experiments; special conflicts described in pending_verification

待核实：

- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## TextLDM — `textldm`

TextLDM: Language Modeling with Continuous Latent Diffusion

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.latent, learning.objective, decoder.alignment, decoder.learned。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.07748) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2605.07748) — Method / experiments; special conflicts described in pending_verification

待核实：

- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## LDLM — `ldlm`

How to Train Your Latent Diffusion Language Model Jointly With the Latent Space

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.latent, learning.objective, decoder.alignment, decoder.learned, sampling.few_step, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.07933) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2605.07933) — Method / experiments; special conflicts described in pending_verification

待核实：

- 论文速度主张不能自动解释为 kernel 加速；需核实完整计时协议。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## Cola DLM — `cola-dlm`

Continuous Latent Diffusion Language Model

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.latent, learning.scaling, learning.large_scale, decoder.alignment, decoder.learned。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.06548) — Abstract; method sections where noted
- [official_project](https://hongcanguo.github.io/Cola-DLM/) — project_identity
- [official_code](https://github.com/ByteDance-Seed/Cola-DLM) — Linked from original paper / official project
- [original_paper](https://arxiv.org/html/2605.06548) — Method / experiments; special conflicts described in pending_verification

待核实：

- decoder 是否以及如何自回归，需逐配置确认；不能把 block-causal DiT 等同全序列并行。
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- evaluation_metrics 未逐表抽取，保留 null

## AURORA-LM — `aurora-lm`

AURORA-LM: Autoencoding Unified Representation for Continuous-Latent Diffusion Language Modeling

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.latent, learning.large_scale, decoder.alignment, decoder.learned。

原始来源：

- [original_paper](https://arxiv.org/abs/2608.02602) — Abstract; method sections where noted
- [official_project](https://aurora-lm-project.github.io/) — project_identity
- [official_code](https://github.com/fyv587/AURORA-LM) — Linked from original paper / official project
- [original_paper](https://arxiv.org/html/2608.02602) — Method / experiments; special conflicts described in pending_verification

待核实：

- Ascend NPU 实验是平台信息，不是硬件协同设计证据。
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- evaluation_metrics 未逐表抽取，保留 null

## FMLM — `fmlm`

Flow Map Language Models: One-step Language Modeling via Continuous Denoising

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.categorical, learning.objective, sampling.few_step, sampling.one_step, sampling.distillation, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2602.16813) — Abstract; method sections where noted
- [official_code](https://github.com/david3684/flm) — code_identity
- [original_paper](https://arxiv.org/html/2602.16813) — Method / experiments; special conflicts described in pending_verification

待核实：

- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## Fixed-point Flows — `fixed-point-flows`

Self-conditioned Flow Map Language Models via Fixed-point Flows

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.categorical, sampling.one_step, sampling.few_step, sampling.distillation, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2607.00714) — Abstract; method sections where noted
- [official_code](https://github.com/Ugness/self-conditioned-fmlm) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## FMLM+ — `fmlm-plus`

Posterior Refinement: Fast Language Generation via Any-Order Flow Maps

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.categorical, sampling.one_step, sampling.adaptive, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2606.24773) — Abstract; method sections where noted
- [official_project](https://posterior-refinement.github.io/) — project_identity
- [official_code](https://github.com/MananAg007/posterior-refinement) — Linked from original paper / official project
- [original_paper](https://arxiv.org/html/2606.24773) — Method / experiments; special conflicts described in pending_verification

待核实：

- masking-style schedule 不等于离散 masked-state DLM；不因 masking 一词归为纯离散。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- evaluation_metrics 未逐表抽取，保留 null

## TTCD — `ttcd`

Token Time Continuous Diffusion for Language Modeling

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：False；分类：representation.categorical, sampling.token_time, sampling.distillation, sampling.few_step, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2607.14106) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2607.14106) — Method / experiments; special conflicts described in pending_verification

待核实：

- arXiv ID 为 2607.14106，但原始页面 submission date 显示 2026-05-07；Timeline 精确日期暂置 null，需向作者核实。
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null
- 原文 Abstract 与 §4.2 写 160M，Contributions / Limitations 写 100M；model_scale 置 null，不能擅自选择。

## CoDAR — `codar`

CoDAR: Continuous Diffusion Language Models are More Powerful Than You Think

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, decoder.rounding, decoder.alignment, decoder.learned。

原始来源：

- [original_paper](https://arxiv.org/abs/2603.02547) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2603.02547) — Method / experiments; special conflicts described in pending_verification

待核实：

- 扩散阶段并行，不代表端到端非自回归；decoder 成本需单独计量。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## Decoder-Interface Problem — `decoder-interface-problem`

Continuous Language Diffusion as a Decoder-Interface Problem

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：decoder.readout, decoder.rounding, decoder.alignment, sampling.adaptive, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2606.08810) — Abstract; method sections where noted

待核实：

- 这是审计与诊断研究，不是一个新的通用预训练模型；跨模型结论有边界。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## CANDI — `candi`

CANDI: Hybrid Discrete-Continuous Diffusion Models

年份：2025；正式发表年：2026；venue：ICML；状态：accepted；scope：core。

核心核实：True；分类：hybrid.candi, representation.categorical, sampling.few_step, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2510.22510) — Abstract; method sections where noted
- [official_publication](https://jiaxins.io/publications.html) — publication_status, venue
- [official_project](https://patrickpynadath1.github.io/candi-lander) — project_identity
- [official_code](https://github.com/patrickpynadath1/candi-diffusion) — Linked from original paper / official project
- [original_paper](https://arxiv.org/html/2510.22510) — Method / experiments; special conflicts described in pending_verification

待核实：

- model_scale：尚未逐配置核实，保留 null
- 作者官网与会议目录确认 ICML 2026；正式 proceedings 条目未核到，因此使用 accepted。
- evaluation_metrics 未逐表抽取，保留 null

## CADD — `cadd`

Continuously Augmented Discrete Diffusion model for Categorical Generative Modeling

年份：2025；正式发表年：2026；venue：ICLR；状态：published；scope：core。

核心核实：True；分类：hybrid.cadd, representation.latent, decoder.readout。

原始来源：

- [original_paper](https://arxiv.org/abs/2510.01329) — Abstract; method sections where noted
- [official_publication](https://proceedings.iclr.cc/paper_files/paper/2026/hash/39b77b5e422b4e070e2811b73ea9bcf7-Abstract-Conference.html) — publication_status, venue
- [official_code](https://github.com/apple/ml-cadd) — code_identity
- [original_paper](https://arxiv.org/html/2510.01329) — Method / experiments; special conflicts described in pending_verification

待核实：

- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## CoBit — `cobit`

CoBit: Language Modeling with Bitstream Diffusion

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.binary, decoder.readout, systems.algorithmic, systems.runtime。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.07013) — Abstract; method sections where noted
- [official_code](https://github.com/GBATZOLIS/BitstreamDiffusion) — Linked from original paper / official project
- [original_paper](https://arxiv.org/html/2605.07013) — Method / experiments; special conflicts described in pending_verification

待核实：

- 旧题名 Continuous Bitstream Diffusion 与 CoBit 共用 arXiv ID；仅收录一次。
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 独立官方 project_url 未核到，保留 null
- Appendix F 为合成状态 profiling；真实请求端到端服务成本、memory traffic 与专用 kernel 效果仍未核实。

## BitLM — `bitlm`

BitLM: Unlocking Multi-Token Language Generation with Bitwise Continuous Diffusion

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.binary, decoder.readout, systems.algorithmic, learning.large_scale。

原始来源：

- [original_paper](https://arxiv.org/abs/2605.11577) — Abstract; method sections where noted
- [original_paper](https://arxiv.org/html/2605.11577) — Method / experiments; special conflicts described in pending_verification

待核实：

- AR+连续生成，不自动等于 discrete–continuous hybrid diffusion；不是量化权重模型 BitNet。
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null
- §4 正文与 Table 1 的 XSum ROUGE 数值不同；结果不录入，不能据摘要宣称已证明推理速度优势。

## LD4LG — `ld4lg`

Latent Diffusion for Language Generation

年份：2022；正式发表年：2023；venue：NeurIPS；状态：published；scope：core。

核心核实：True；分类：representation.latent, decoder.learned, decoder.alignment。

原始来源：

- [original_paper](https://arxiv.org/abs/2212.09462) — Abstract; method sections where noted
- [official_publication](https://papers.neurips.cc/paper_files/paper/2023/hash/b2a2bd5d5051ff6af52e1ef60aefd255-Abstract-Conference.html) — publication_status, venue
- [official_code](https://github.com/justinlovelace/latent-diffusion-for-language) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## Early Halting — `early-halting`

Diffusion Language Models Generation Can Be Halted Early

年份：2023；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：sampling.adaptive, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2305.10818) — Abstract; method sections where noted

待核实：

- 是否正式发表未确认；发表 venue 保留 null。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## DeltaFlow — `deltaflow`

DeltaFlow: Noise-Adaptive Bidirectional Gated Delta Networks for Embedded Language Flows

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2608.01240) — Abstract; method sections where noted

待核实：

- 吞吐是 denoiser-only benchmark；不能当作端到端 serving 加速或专用 kernel 贡献。
- model_scale：尚未逐配置核实，保留 null
- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 官方 code_url 未核到可确认链接，保留 null
- 独立官方 project_url 未核到，保留 null

## PlaidQ — `plaidq`

Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One

年份：2026；正式发表年：None；venue：None；状态：arxiv_preprint；scope：core。

核心核实：True；分类：representation.embedding, sampling.few_step, sampling.one_step, sampling.distillation, systems.algorithmic。

原始来源：

- [original_paper](https://arxiv.org/abs/2609.04531) — Abstract; method sections where noted

待核实：

- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- 独立官方 project_url 未核到，保留 null
- 原论文给出的 pengzhangzhi/plaidq 仓库于核验日返回 HTTP 404；code_url 置 null，待确认公开地址。

## LLaDA — `llada`

Large Language Diffusion Models

年份：2025；正式发表年：None；venue：None；状态：arxiv_preprint；scope：context_only。

核心核实：True；分类：learning.adaptation。

原始来源：

- [original_paper](https://arxiv.org/abs/2502.09992) — Abstract; method sections where noted
- [official_project](https://ml-gsai.github.io/LLaDA-demo/) — project_identity
- [official_code](https://github.com/ML-GSAI/LLaDA) — Linked from original paper / official project

待核实：

- 正式发表记录未确认；arxiv_preprint 表示本轮仅核实预印本，不断言尚未获录用
- evaluation_metrics 未逐表抽取，保留 null

## MDLM — `mdlm`

Simple and Effective Masked Diffusion Language Models

年份：2024；正式发表年：2024；venue：NeurIPS；状态：published；scope：context_only。

核心核实：True；分类：learning.objective。

原始来源：

- [original_paper](https://arxiv.org/abs/2406.07524) — Abstract page Comments: NeurIPS 2024
- [official_code](https://github.com/kuleshov-group/mdlm) — code_identity

待核实：

- model_scale：尚未逐配置核实，保留 null
- 独立官方 project_url 未核到，保留 null
- evaluation_metrics 未逐表抽取，保留 null

## 演化关系证据

explicit 关系有目标论文或官方项目的直接支持；editorial 关系只表示研究问题的演化，verified=false，后续 UI 使用不同线型，不能呈现为作者认可的直接继承。masked diffusion 是概念家族，本数据使用 context_only 的 MDLM 作为代表节点；MDLM → CADD 不声称唯一直接来源。FLM/FMLM、ELF 的蒸馏版本仍各为同一论文记录，不为得到 distills 边而制造重复论文。

## 后续可补充的五篇论文（未计入本轮数据库）

- [Self-conditioned Embedding Diffusion for Text Generation / SED](https://arxiv.org/abs/2211.04236)：连续表示与 self-conditioning 的早期工作。
- [Analog Bits](https://arxiv.org/abs/2208.04202)：bit 连续松弛的基础方法，范围不限于语言。
- [The Diffusion Duality / Duo](https://arxiv.org/abs/2506.10892)：离散 uniform-state 与 Gaussian 过程联系；不能直接标成纯连续模型。
- [Categorical Flow Maps](https://arxiv.org/abs/2602.12233)：categorical 几何与 flow-map 蒸馏。
- [David helps Goliath / SSD-2](https://arxiv.org/abs/2305.14771)：SSD 系列的规模扩展与推理时组合。

## 一致性与链接检查

已检查 paper id、arXiv ID 和规范化标题唯一；category 存在；relation source/target 指向现有论文；关系类型受控；未将 context_only 计入主地图分类计数。所有必需字段存在。

HTTP 检查对初始 65 个唯一来源地址得到 64 个 200、1 个 404。404 是 PlaidQ 的作者所给代码仓库，已从有效 URL 字段移除。新增的三个官方仓库经网页工具成功读取并核实身份。HTML 方法来源也成功读取。URL 的可达性只代表核验日，不保证未来持续有效；HTTP 200 本身不等于内容或实验已复现。

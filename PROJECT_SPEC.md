# Continuous dLLM Research Map

数据快照：2026-09-11。当前交付仅包含文献、分类和关系数据，不包含前端。

## 目标与用户

建立一个可追溯到原论文、按研究问题浏览的 continuous diffusion / flow language model 地图。服务研究者、研究生，以及评估推理瓶颈的模型与系统工程师。帮助用户回答：表示是什么、如何训练、如何采样、如何转成 token、加速发生在哪里、哪些问题尚缺证据。

参考 [DFlash Atlas 的 research map](https://joelulu.github.io/Awesome-Parallel-Speculative-Decoding/#research-map)：问题分支结合时间演进、类别图例、方法卡片和大纲。参考网站明确区分时间顺序与继承；本项目也不把时间相邻直接解释为研究继承。

## 问题分类

| 主类 | 子问题 |
| --- | --- |
| Continuous Representation | embedding-space；categorical/simplex；latent；binary/compact codes |
| Learning & Scaling | likelihood/objective；scaling law；大规模模型；discrete-to-continuous adaptation |
| Sampling & Generation | few-step；one-step/flow map；distillation；adaptive refinement；token-wise time |
| Decoder Interface | state→token；rounding；representation–decoder alignment；learned/VAE/AR decoder |
| Hybrid Discrete–Continuous | CANDI 解耦腐化；CADD 连续增强；其他明确混合 |
| Systems & Infrastructure | 算法效率；GPU runtime/kernel；serving/scheduling；hardware co-design |

六个主类、24 个子类允许多标签。模型规模较大不自动成为 scaling-law 工作，masking-style schedule 不自动成为 discrete-state 模型，某个方向为空也不等于该方向不存在研究。

## 概念边界

**Continuous-state 与 continuous-time 是两条轴。** 前者描述迭代状态是否为实数向量、连续 logits、流形点或 analog bits；后者描述时间参数。离散 token/MASK 状态可以具有连续时间目标，但仍是离散 DLM。Transformer 内部有实数 hidden state 也不足以算 continuous-state，需考察生成迭代之间实际传递和更新的状态。LLaDA、MDLM 仅作为离散背景节点；DSL-LLaDA 的连续 embedding 更新另行归类。

**Token-level continuous 与 latent diffusion 可以重叠。** token-level 通常每个位置对应一个词元的 embedding、one-hot 或 bit code；latent 方法先学习或调用 encoder/autoencoder，将文本映射为潜变量再生成。潜变量未必压缩长度，也未必使用 VAE。ELF 默认使用逐 token 的上下文表示，故同时关联 embedding 与 latent，但共享 denoiser/decoder，不应标为压缩 VAE。TextLDM、LDLM、Cola DLM、AURORA-LM 的表示构造与 decoder 分别记录。

**Categorical 目标不决定扩散状态。** CDCD 在欧氏 token embedding 上扩散；FMLM 对 one-hot embedding 连续输运；RDLM 使用统计流形。带 Gaussian 噪声的 one-hot 或 logits 不必始终位于概率 simplex；`continuous_categorical_geometry` 是包含这些方法的研究标签，不是断言其每一步都满足 simplex 约束。

**并行扩散不保证端到端非自回归。** CoDAR 具有 AR decoder；SSD-LM、BitLM、AURORA-LM 保留块间因果生成；Cola DLM 的 latent prior 按块自回归。AR+连续模块不自动等于离散与连续腐化混合。

**算法效率与系统效率分别显示。** 少 NFE、少 sampling steps、早停、蒸馏属于算法改进。架构减少单步算术或输出维度另记 `architecture`。只有固定工作量下的 GPU latency、内存、kernel/runtime 或服务成本证据才支持对应系统主张。CoBit Appendix F 有固定 NFE 的 GPU profiling，但使用合成状态并排除解码/I/O，既非真实 serving 评估，也非专用 kernel 创新。DeltaFlow 的 denoiser-only throughput 不能展示为完整服务速度。

后续比较端到端耗时应同时计入前缀编码、各次 denoiser 调用、guidance/self-conditioning、读出/AR decoder 和调度开销。NFE 不一定等于采样步数，CFG 或额外预测可能增加调用。比较时还需对齐硬件、精度、batch、长度、质量与多样性，不能混用 PPL bound 与外部模型计算的 generative PPL。

## 数据契约

- `data/taxonomy.json`：版本、研究边界、扁平 `categories`；以 `parent_id` 形成两层树。计数只包含 `scope=core`，同一论文可跨分支。
- `data/papers.json`：论文对象数组。`id` 为稳定键，`alias` 为字符串数组，`categories` 为 category id 数组；所要求的字段全部存在。未知数据使用 JSON `null`。`evaluation_metrics` 只记录核实到的指标，不表示已穷尽全部指标。
- `model_scale` 为可空对象，含参数配置、组件、范围及原始来源；不将名义 8B 当作精确参数数目。`results=null`：本轮不建立数值排行榜。
- `year` 是最早已核实的论文年份；`first_submission_date` 单独记录；`publication_year` 为正式发表年份。`publication_status` 当前使用 `arxiv_preprint`、`accepted`、`published`，venue 不写 arXiv。预印本状态仅描述本轮证据，非穷尽否定正式录用。
- `verified` 表示身份和核心方法的一手核实，不是复现认证或全部字段完整认证。结合 `verification_level`、`pending_verification`、`verification_sources.supports/locator/url_check` 阅读。TTCD 存在原文冲突，单独标 false；unknown 不自动转为 false 或零。
- `scope=core` 为主地图；`scope=context_only` 的 LLaDA/MDLM 可显示为背景节点，默认不进入 continuous 模型计数。
- `data/relations.json`：含 `relations` 数组，`source/target` 都是 paper id。`explicit` 表示直接证据；`editorial` 表示编辑性研究演化，后者 `verified=false`。关系不保证时间拓扑顺序，较晚修订可以讨论更晚出现的模型。
- CoBit 与旧题名合并；FLM/FMLM 是同一论文；FMLM★ 与 FMLM+ 是两篇；FlowSeq 特指 EACL 2024 工作。
- `REFERENCES.md`：逐篇列出一手来源、缺口、版本/字段冲突和检查范围。数据中的来源时间戳是核验日，不能当作论文发布日期。

## 后续网站模块

1. **Research Map**：问题分支、多标签、明确区分已证实关系和编辑性关系；可切换大纲。
2. **Timeline**：首次公开与正式发表分别显示；TTCD 日期冲突显示“待核实”。
3. **Paper Database**：按 state、representation unit、decoder、规模、venue、证据状态筛选。
4. **Inference Efficiency**：分开看 NFE/steps、单步架构成本、GPU 测量及完整服务成本；提供实验条件。
5. **Systems / Open Problems**：列出 kernel、服务调度与硬件协同设计的证据缺口，以及 decoder、低步数质量和缩放开放问题。

本轮不实现上述模块。后续页面应明确呈现待核实信息，不能隐藏 null 或将未核实推断画成实证结论。

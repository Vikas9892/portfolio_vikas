import { socials } from "./site";

/* -------------------------------------------------------------------------- */
/*  Metrics strip                                                             */
/* -------------------------------------------------------------------------- */

export type Metric = {
  value: number;
  /** Rendered after the count-up number, e.g. "ops/sec". */
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

export const metrics: Metric[] = [
  { value: 1327, label: "tests at 99% coverage — Product Intelligence Engine" },
  { value: 9619, suffix: " ops/sec", label: "C++ key-value store, single connection" },
  { value: 4831, suffix: " ops/sec", label: "sustained at 1,000 concurrent connections" },
  { value: 410, suffix: " ms", label: "crash recovery of 10,000 keys, zero data loss" },
  { value: 1000, suffix: "+", label: "DSA problems solved across platforms" },
];

/* -------------------------------------------------------------------------- */
/*  Hero marquee                                                              */
/* -------------------------------------------------------------------------- */

export const marqueeItems = [
  "C++20",
  "Python",
  "FastAPI",
  "Qdrant",
  "FAISS",
  "Redis",
  "epoll",
  "CLIP",
  "BGE",
  "Next.js",
  "TypeScript",
  "Docker",
  "AWS Lambda",
  "CI/CD",
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  /** One-line positioning statement shown on the card. */
  tagline: string;
  /** The problem the project set out to solve. */
  problem: string;
  /** How the system is put together. */
  architecture: string;
  /** The decisions worth defending in an interview. */
  decisions: string[];
  /** Measured, verifiable outcomes. */
  results: string[];
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
  diagram: "product-intelligence" | "kv-store" | "rag" | "nifty";
  screenshots?: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "product-intelligence",
    name: "Multi-Modal Product Intelligence Engine",
    tagline:
      "A retrieval platform that indexes products as both images and text, then explains every verdict it returns.",
    problem:
      "Catalog systems break down when the same product arrives as a photo, a title, and a messy description all at once. Keyword search misses the photo, image search misses the description, and neither can tell you why it thought two listings were the same item. I wanted a system that indexes both modalities, fuses them at query time, and shows its reasoning.",
    architecture:
      "Products are embedded twice — 512-dimensional CLIP vectors for imagery and 384-dimensional BGE vectors for text — and stored in Qdrant. Queries run hybrid retrieval, fusing image and text similarity with a configurable weighting, then rerank the candidate set with a ms-marco-MiniLM-L-6-v2 cross-encoder. Ingestion is fully asynchronous: uploads return immediately while a four-worker background pool generates embeddings. Redis is the primary datastore — job queue, product state, recommendation cache and analytics buckets all live there with AOF persistence.",
    decisions: [
      "Two vector spaces instead of one joint space — CLIP for imagery and BGE for text — so each modality is retrieved in the space it was trained for, and the fusion weighting stays a tunable knob rather than a baked-in assumption.",
      "Cross-encoder reranking only over the candidate set returned by vector search, keeping the expensive pairwise model off the hot path while still correcting the ordering that bi-encoders get wrong.",
      "Redis as the primary datastore rather than a cache in front of a database — job queue, product state, recommendation cache and analytics buckets all in one engine, with AOF persistence for durability.",
      "Duplicate detection scored across three tiers (OFF / WARN / BLOCK) with a cross-encoder verifier, so the system returns a defensible verdict instead of an opaque similarity float.",
      "Pricing estimated deterministically from comparables — trimmed mean, weighted average and median — because a reproducible number beats a model that cannot be audited.",
      "Structured decision traces on every request, so any answer the engine gives can be reconstructed after the fact.",
    ],
    results: [
      "1,327 tests at 99% branch coverage across 69 commits",
      "CI enforcing ruff, black and mypy on every push",
      "Frontend: 12 routes, 154 unit tests, 64 Playwright E2E specs",
      "Prometheus metrics with health and readiness probes",
      "Opt-in enterprise layer: API keys, RBAC, tenant isolation, audit logging, quotas",
    ],
    tech: [
      "Python 3.12",
      "FastAPI",
      "Qdrant",
      "Redis",
      "CLIP",
      "BGE",
      "Sentence Transformers",
      "Docker Compose",
      "Prometheus",
      "pytest",
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Recharts",
      "Playwright",
    ],
    github: "https://github.com/Vikas9892/product_intelligence",
    featured: true,
    diagram: "product-intelligence",
    screenshots: [
      {
        src: "/screenshots/dashboard.png",
        alt: "Product Intelligence console dashboard showing catalog activity counters, pipeline throughput charts and system health indicators",
        caption: "Live catalog activity, pipeline throughput, system health",
      },
      {
        src: "/screenshots/upload.png",
        alt: "Product ingestion screen with an image drop zone and metadata fields for a new catalog entry",
        caption: "Product ingestion with image + metadata",
      },
      {
        src: "/screenshots/ai-search.png",
        alt: "AI search interface running text, image and hybrid retrieval queries against the indexed product catalog",
        caption: "Text, image, and hybrid retrieval over the indexed catalog",
      },
      {
        src: "/screenshots/duplicates.png",
        alt: "Duplicate detection results listing candidate product pairs with similarity verdicts and the reasoning behind each decision",
        caption: "Duplicate verdicts with the reasoning behind them",
      },
      {
        src: "/screenshots/recommendations.png",
        alt: "Per-product recommendation panel showing similar products alongside written explanations for each suggestion",
        caption: "Per-product recommendations with explanations",
      },
      {
        src: "/screenshots/pricing.png",
        alt: "Price estimation view deriving a suggested price from semantically similar comparable products",
        caption: "Price estimation from semantically similar products",
      },
      {
        src: "/screenshots/analytics.png",
        alt: "Analytics dashboard reporting usage counts, request latency, throughput and model activity",
        caption: "Usage, latency, throughput, and model activity",
      },
      {
        src: "/screenshots/analytics-charts.png",
        alt: "Event trend charts over time next to a breakdown of which models are currently in use",
        caption: "Event trend charts and models in use",
      },
      {
        src: "/screenshots/models.png",
        alt: "Model registry listing the CLIP 512-dimensional image encoder, BGE 384-dimensional text encoder and cross-encoder reranker",
        caption: "Model registry — CLIP 512-d, BGE 384-d, cross-encoder",
      },
      {
        src: "/screenshots/model-registry.png",
        alt: "Registered model versions with their embedding dimensions and deployment status",
        caption: "Registered model versions and dimensions",
      },
      {
        src: "/screenshots/system.png",
        alt: "System health page showing operational status of services and runtime statistics",
        caption: "Operational health and runtime statistics",
      },
    ],
  },
  {
    slug: "kv-store",
    name: "Distributed Key-Value Store",
    tagline:
      "Written from raw TCP sockets upward — event loop, thread pool, write-ahead log and replication, all measured.",
    problem:
      "Reaching for Redis teaches you Redis. I wanted to know what it actually costs to accept a thousand concurrent connections, keep a shared map consistent across threads, and survive a SIGKILL without losing a write — so I built the store from raw sockets instead of importing one.",
    architecture:
      "A move-only RAII socket wrapper sits at the bottom, with TcpServer and ClientSession kept as separate concerns above it. Two server implementations share that core: a select-based loop and an edge-triggered epoll event loop. A thread pool guarded by a shared_mutex serves reads concurrently while serialising writes. Durability is an append-only write-ahead log plus CRC32-verified snapshots committed with atomic rename; a leader forwards writes to a replica over TCP.",
    decisions: [
      "Edge-triggered epoll over select once connection counts grew — select's linear descriptor scan is the thing that stops scaling, and the sweep data shows where it starts to hurt.",
      "A move-only RAII socket wrapper so descriptors cannot be double-closed or leaked, and ownership is obvious at every call site.",
      "TcpServer and ClientSession as separate types, so connection lifecycle and protocol handling can be tested and reasoned about independently.",
      "shared_mutex rather than a plain mutex — reads dominate the workload, and readers-writer locking is what keeps 1,000 concurrent clients from serialising on a single lock.",
      "Atomic rename on snapshot commit with CRC32 verification, so a crash mid-snapshot can never leave a torn file that recovery would happily load.",
    ],
    results: [
      "9,619 ops/sec on a single connection",
      "4,831 ops/sec sustained at 1,000 concurrent clients — 16% degradation",
      "p99 latency 4.62 ms across a seven-level concurrency sweep",
      "10,000 keys recovered in 410 ms after SIGKILL, zero data loss",
      "28-test GoogleTest suite",
    ],
    tech: [
      "C++20",
      "TCP sockets",
      "epoll",
      "POSIX threads",
      "Write-ahead logging",
      "CMake",
      "GoogleTest",
    ],
    github: "https://github.com/Vikas9892/KV_STORE",
    diagram: "kv-store",
  },
  {
    slug: "rag-evaluation",
    name: "RAG Evaluation System",
    tagline:
      "A retrieval pipeline built without LangChain, and the evaluation harness that proves it works.",
    problem:
      "Most RAG demos are one good-looking answer away from being unfalsifiable. I built the pipeline from its parts — no framework abstraction in the way — and then built the harness that scores it, so improvements are measured rather than asserted.",
    architecture:
      "Dense retrieval over a FAISS index and sparse retrieval over BM25 run in parallel, then fuse via Reciprocal Rank Fusion at k=60. The fused candidates are reranked by a cross-encoder operating in a 384-dimensional BGE space before generation. The API streams tokens over SSE and deploys to AWS Lambda through Mangum and SAM.",
    decisions: [
      "No LangChain — every stage is a function I can profile, test and swap, which is also why the BM25 leg could be measured at 0.2 ms in isolation.",
      "Reciprocal Rank Fusion at k=60 to combine dense and sparse rankings, because RRF needs no score normalisation between two retrievers whose scores are not on comparable scales.",
      "A custom evaluation harness — Precision@K, Recall, MRR and LLM-judged faithfulness — so retrieval quality and answer quality are scored separately rather than conflated.",
      "Streaming over SSE on Lambda via Mangum, so the user sees first tokens well before the full generation completes.",
    ],
    results: [
      "1.00 Recall@5, 1.00 MRR, 1.00 Hit Rate on a 15-question ground-truth set",
      "0.2 ms BM25 retrieval; 1.5–3.5 s end to end",
      "289 tests at 87% coverage",
      "CI across Python 3.11 and 3.12",
    ],
    tech: [
      "Python",
      "FAISS",
      "BM25",
      "FastAPI",
      "AWS Lambda",
      "Sentence Transformers",
      "Groq",
    ],
    github: "https://github.com/Vikas9892/rag_evaluation",
    diagram: "rag",
  },
  {
    slug: "nifty-portfolio-optimizer",
    name: "Nifty Portfolio Optimizer",
    tagline:
      "Mean-variance optimisation behind an async job queue, with a circuit breaker for the market-data API.",
    problem:
      "Portfolio optimisation is slow enough to time out a request and depends on an external market-data API that will eventually fail. Both problems had to be designed for rather than discovered in production.",
    architecture:
      "A FastAPI service hands optimisation runs to a Redis-backed worker so requests return immediately and clients poll for results. Calls to the external market-data provider pass through a circuit breaker that trips on sustained failure instead of retrying into a dead dependency. A React and TypeScript frontend drives the whole flow, and the stack ships via Docker and GitHub Actions.",
    decisions: [
      "Async job architecture with a Redis-backed worker, because a synchronous optimisation endpoint is a timeout waiting to happen.",
      "A circuit breaker in front of the market-data API so a failing upstream degrades the feature instead of exhausting the worker pool.",
      "A CI gate at 80% coverage — a threshold the build enforces rather than a number in a README.",
    ],
    results: ["163 tests with an 80% coverage gate enforced in CI", "Deployed and live on Vercel"],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Redis",
      "Docker",
      "GitHub Actions",
    ],
    github: "https://github.com/Vikas9892/nifty-portfolio-optimizer",
    live: "https://nifty-portfolio-optimizer.vercel.app",
    diagram: "nifty",
  },
];

/* -------------------------------------------------------------------------- */
/*  Competitive programming                                                   */
/* -------------------------------------------------------------------------- */

export type Platform = {
  name: string;
  handle: string;
  url: string;
  badge: string;
  /** Headline rating figure. */
  rating: number;
  ratingLabel: string;
  /** Where `rating` sits on the arc, as a 0–1 fraction of `arcMax`. */
  arcMax: number;
  note?: string;
  /** Brand colour, used only for the platform accent. */
  color: string;
};

export const platforms: Platform[] = [
  {
    name: "Codeforces",
    handle: "Vikas9140",
    url: socials.codeforces,
    badge: "Specialist",
    rating: 1460,
    ratingLabel: "current rating",
    arcMax: 2100,
    color: "#1f8acb",
  },
  {
    name: "CodeChef",
    handle: "smack_angel_65",
    url: socials.codechef,
    badge: "4★",
    rating: 1828,
    ratingLabel: "peak rating",
    arcMax: 2200,
    note: "Ranked 161st of 35,000+ in CodeChef Starters",
    color: "#b8862f",
  },
  {
    name: "LeetCode",
    handle: "vikas7871",
    url: socials.leetcode,
    badge: "91st percentile",
    rating: 1783,
    ratingLabel: "peak rating",
    arcMax: 2200,
    color: "#e08a1e",
  },
];

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  icon: "code" | "network" | "server" | "brain" | "layout" | "cloud" | "cpu";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["C/C++ (C++20)", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "Distributed Systems",
    icon: "network",
    items: [
      "TCP/IP sockets",
      "epoll",
      "Multithreading",
      "Thread pools",
      "Readers-writer locks",
      "Write-ahead logging",
      "Replication",
      "Fault tolerance",
      "Caching",
      "In-memory data stores",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST API design",
      "Async processing",
      "Background workers",
      "JWT/OAuth",
      "RBAC",
    ],
  },
  {
    title: "AI & Retrieval",
    icon: "brain",
    items: [
      "RAG",
      "Qdrant",
      "FAISS",
      "CLIP",
      "BGE",
      "Hybrid search",
      "Reciprocal Rank Fusion",
      "Cross-encoder reranking",
      "BM25",
      "Sentence Transformers",
    ],
  },
  {
    title: "Frontend",
    icon: "layout",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "Recharts",
      "Playwright",
    ],
  },
  {
    title: "Infrastructure",
    icon: "cloud",
    items: [
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git",
      "GitHub Actions",
      "AWS Lambda",
      "Prometheus",
      "Linux",
    ],
  },
  {
    title: "Core CS",
    icon: "cpu",
    items: [
      "Data structures & algorithms",
      "Complexity analysis",
      "OOP & design",
      "Operating systems",
      "DBMS",
      "Computer networks",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience & education                                                    */
/* -------------------------------------------------------------------------- */

export const experience = {
  role: "Competitive Programming Member",
  organisation: "CODAME, IIIT Bhopal",
  period: "Nov 2024 – Sep 2025",
  points: [
    "Led 10 workshops on data structures, algorithms and time complexity for 120 first-year students, establishing CODAME's core onboarding curriculum.",
    "Authored and reviewed 15 contest problems, driving a 65% increase in club outreach.",
  ],
};

export const education = {
  degree: "B.Tech, Information Technology",
  institution: "IIIT Bhopal",
  period: "Aug 2023 – Jun 2027",
  cgpa: "8.43 / 10",
};

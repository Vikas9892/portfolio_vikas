import { Box, Caption, DiagramShell, Flow, Pulse } from "./primitives";

/* -------------------------------------------------------------------------- */
/*  Multi-Modal Product Intelligence Engine                                   */
/* -------------------------------------------------------------------------- */

function ProductIntelligenceDiagram() {
  const id = "diag-pi";
  const m = `${id}-arrow`;

  return (
    <DiagramShell
      id={id}
      viewBox="0 0 760 252"
      title="Product Intelligence Engine architecture"
      description="Ingestion path: uploads enter a Redis queue, a four-worker pool generates CLIP 512-dimensional image vectors and BGE 384-dimensional text vectors, and both are written to Qdrant. Query path: a query runs hybrid image-text fusion against Qdrant, a cross-encoder reranks the candidates, and ranked results are returned."
    >
      <Caption x={16} y={22} anchor="start">
        Ingest
      </Caption>
      <Box x={16} y={36} label="Upload" sub="image + meta" />
      <Box x={167} y={36} label="Redis queue" sub="AOF persist" />
      <Box x={318} y={36} label="Worker pool" sub="4 workers" />
      <Box x={469} y={36} label="Embeddings" sub="CLIP · BGE" accent />
      <Box x={620} y={36} label="Qdrant" sub="512-d · 384-d" accent />

      <Flow d="M140 60 H167" markerId={m} />
      <Flow d="M291 60 H318" markerId={m} delay={0.2} />
      <Flow d="M442 60 H469" markerId={m} delay={0.4} />
      <Flow d="M593 60 H620" markerId={m} delay={0.6} />

      {/* Indexed vectors feed the query path below. */}
      <Flow d="M682 84 V128 H305 V190" markerId={m} delay={0.8} />

      <Caption x={92} y={176} anchor="start">
        Query
      </Caption>
      <Box x={92} y={190} label="Query" sub="text · image" />
      <Box x={243} y={190} label="Hybrid fusion" sub="weighted sim" accent />
      <Box x={394} y={190} label="Cross-encoder" sub="MiniLM-L-6" />
      <Box x={545} y={190} label="Ranked results" sub="+ trace" />

      <Flow d="M216 214 H243" markerId={m} />
      <Flow d="M367 214 H394" markerId={m} delay={0.2} />
      <Flow d="M518 214 H545" markerId={m} delay={0.4} />

      <Pulse cx={229} cy={60} />
      <Pulse cx={380} cy={60} delay={0.5} />
      <Pulse cx={305} cy={214} delay={1} />
    </DiagramShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Distributed Key-Value Store                                               */
/* -------------------------------------------------------------------------- */

function KvStoreDiagram() {
  const id = "diag-kv";
  const m = `${id}-arrow`;

  return (
    <DiagramShell
      id={id}
      viewBox="0 0 760 230"
      title="Key-value store architecture"
      description="Up to 1,000 client connections are accepted by an edge-triggered epoll event loop, dispatched to a thread pool guarded by a shared_mutex, and applied to an in-memory map. The map forwards writes to a replica over TCP and persists through an append-only write-ahead log and CRC32-verified snapshots, which recover 10,000 keys in 410 milliseconds after a crash."
    >
      <Caption x={16} y={22} anchor="start">
        Event loop
      </Caption>
      <Box x={16} y={36} label="Clients" sub="1,000 conns" />
      <Box x={167} y={36} label="epoll loop" sub="edge-triggered" accent />
      <Box x={318} y={36} label="Thread pool" sub="shared_mutex" />
      <Box x={469} y={36} label="In-memory map" sub="9,619 ops/s" accent />
      <Box x={620} y={36} label="Replica" sub="TCP forward" />

      <Flow d="M140 60 H167" markerId={m} />
      <Flow d="M291 60 H318" markerId={m} delay={0.2} />
      <Flow d="M442 60 H469" markerId={m} delay={0.4} />
      <Flow d="M593 60 H620" markerId={m} delay={0.6} />

      {/* Durability path. */}
      <Flow d="M531 84 V132 H229 V166" markerId={m} delay={0.8} />

      <Caption x={167} y={152} anchor="start">
        Durability
      </Caption>
      <Box x={167} y={166} label="Write-ahead log" sub="append-only" />
      <Box x={318} y={166} label="Snapshot" sub="CRC32 · rename" />
      <Box x={469} y={166} label="Recovery" sub="410 ms · 10k keys" accent />

      <Flow d="M291 190 H318" markerId={m} delay={1} />
      <Flow d="M442 190 H469" markerId={m} delay={1.2} />

      <Pulse cx={229} cy={60} />
      <Pulse cx={380} cy={60} delay={0.4} />
      <Pulse cx={531} cy={60} delay={0.8} />
    </DiagramShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  RAG Evaluation System                                                     */
/* -------------------------------------------------------------------------- */

function RagDiagram() {
  const id = "diag-rag";
  const m = `${id}-arrow`;

  return (
    <DiagramShell
      id={id}
      viewBox="0 0 760 240"
      title="RAG retrieval pipeline"
      description="A query fans out to dense FAISS retrieval over a 384-dimensional BGE space and sparse BM25 retrieval. The two rankings are fused with Reciprocal Rank Fusion at k equals 60, reranked by a cross-encoder, and passed to generation which streams tokens over server-sent events."
    >
      <Box x={16} y={100} w={112} label="Query" />

      <Caption x={224} y={28}>
        Dense
      </Caption>
      <Box x={168} y={40} w={112} label="FAISS" sub="384-d BGE" accent />

      <Caption x={224} y={228}>
        Sparse
      </Caption>
      <Box x={168} y={160} w={112} label="BM25" sub="0.2 ms" accent />

      <Box x={320} y={100} w={112} label="RRF fusion" sub="k = 60" accent />
      <Box x={472} y={100} w={112} label="Cross-encoder" sub="rerank" />
      <Box x={624} y={100} w={112} label="Generate" sub="SSE stream" />

      <Flow d="M128 124 C148 124 148 64 168 64" markerId={m} />
      <Flow d="M128 124 C148 124 148 184 168 184" markerId={m} delay={0.15} />
      <Flow d="M280 64 C300 64 300 124 320 124" markerId={m} delay={0.45} />
      <Flow d="M280 184 C300 184 300 124 320 124" markerId={m} delay={0.6} />
      <Flow d="M432 124 H472" markerId={m} delay={0.9} />
      <Flow d="M584 124 H624" markerId={m} delay={1.1} />

      <Pulse cx={224} cy={64} />
      <Pulse cx={224} cy={184} delay={0.3} />
      <Pulse cx={376} cy={124} delay={0.7} />
    </DiagramShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nifty Portfolio Optimizer                                                 */
/* -------------------------------------------------------------------------- */

function NiftyDiagram() {
  const id = "diag-nifty";
  const m = `${id}-arrow`;

  return (
    <DiagramShell
      id={id}
      viewBox="0 0 760 232"
      title="Nifty Portfolio Optimizer architecture"
      description="Requests hit a FastAPI service which enqueues optimisation jobs onto a Redis-backed queue. A worker runs mean-variance optimisation and fetches market data through a circuit breaker that trips when the external provider fails, so a bad upstream degrades the feature instead of exhausting the worker pool."
    >
      <Caption x={16} y={36} anchor="start">
        Request path
      </Caption>
      <Box x={16} y={50} label="React client" sub="polls result" />
      <Box x={167} y={50} label="FastAPI" sub="returns job id" />
      <Box x={318} y={50} label="Redis queue" sub="async jobs" accent />
      <Box x={469} y={50} label="Worker" sub="mean-variance" accent />

      <Flow d="M140 74 H167" markerId={m} />
      <Flow d="M291 74 H318" markerId={m} delay={0.2} />
      <Flow d="M442 74 H469" markerId={m} delay={0.4} />

      {/* Result is written back for the client to poll. */}
      <Flow d="M531 98 V122 H229 V98" markerId={m} delay={0.6} />

      <Caption x={469} y={156} anchor="start">
        External data
      </Caption>
      <Box x={469} y={170} label="Circuit breaker" sub="trips on fail" accent />
      <Box x={620} y={170} label="Market data API" sub="external" />

      <Flow d="M593 194 H620" markerId={m} delay={0.9} />

      <Pulse cx={380} cy={74} />
      <Pulse cx={531} cy={74} delay={0.5} />
    </DiagramShell>
  );
}

/* -------------------------------------------------------------------------- */

const diagrams = {
  "product-intelligence": ProductIntelligenceDiagram,
  "kv-store": KvStoreDiagram,
  rag: RagDiagram,
  nifty: NiftyDiagram,
} as const;

export type DiagramKey = keyof typeof diagrams;

export function ArchitectureDiagram({ variant }: { variant: DiagramKey }) {
  const Diagram = diagrams[variant];
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface/60 p-4 text-foreground sm:p-6">
      <div className="min-w-[34rem]">
        <Diagram />
      </div>
    </div>
  );
}

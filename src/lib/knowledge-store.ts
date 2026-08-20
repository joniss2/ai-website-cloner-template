import type { KnowledgeNode, KnowledgeEdge, KnowledgeGraph } from "@/types/agency";

let nodes: KnowledgeNode[] = [];
let edges: KnowledgeEdge[] = [];

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function addNode(node: KnowledgeNode): void {
  const existing = nodes.find((n) => n.id === node.id);
  if (!existing) {
    nodes.push(node);
  }
}

export function addEdge(edge: KnowledgeEdge): void {
  const exists = edges.some(
    (e) => e.source === edge.source && e.target === edge.target
  );
  if (!exists) {
    edges.push(edge);
    // Track connection on nodes
    const src = nodes.find((n) => n.id === edge.source);
    const tgt = nodes.find((n) => n.id === edge.target);
    if (src && !src.connections.includes(edge.target)) src.connections.push(edge.target);
    if (tgt && !tgt.connections.includes(edge.source)) tgt.connections.push(edge.source);
  }
}

export function getGraph(): KnowledgeGraph {
  return { nodes: [...nodes], edges: [...edges] };
}

export function clearGraph(): void {
  nodes = [];
  edges = [];
}

export function searchNodes(query: string): KnowledgeNode[] {
  const q = query.toLowerCase();
  return nodes.filter(
    (n) => n.label.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  );
}

export function extractKnowledge(text: string, agentId: string): KnowledgeNode[] {
  const extracted: KnowledgeNode[] = [];
  const sentences = text
    .split(/[.!]\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 300);

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    let type: KnowledgeNode["type"] = "fact";
    let label = "";

    if (sentence.endsWith("?") || lower.startsWith("what") || lower.startsWith("how") || lower.startsWith("why")) {
      type = "question";
      label = sentence.replace(/\?$/, "").split(" ").slice(0, 6).join(" ") + "?";
    } else if (
      lower.includes(" is ") ||
      lower.includes(" are ") ||
      lower.includes(" means ") ||
      lower.includes(" refers to ") ||
      lower.includes(" defined as ")
    ) {
      type = "fact";
      // Use first half up to the verb as label
      const verbMatch = sentence.match(/^(.{5,40?})\b(is|are|means|refers to|defined as)\b/i);
      label = verbMatch ? verbMatch[1].trim() : sentence.split(" ").slice(0, 5).join(" ");
    } else if (
      lower.includes("therefore") ||
      lower.includes("thus") ||
      lower.includes("insight") ||
      lower.includes("importantly") ||
      lower.includes("notably") ||
      lower.includes("key ") ||
      lower.includes("crucial") ||
      lower.includes("signif")
    ) {
      type = "insight";
      label = sentence.split(" ").slice(0, 6).join(" ");
    } else {
      // Extract capitalized noun phrases as concepts
      const caps = sentence.match(/\b([A-Z][a-zA-Z]+ (?:[A-Z][a-zA-Z]+ ?)*)/g);
      if (caps && caps.length > 0) {
        type = "concept";
        label = caps[0].trim();
      } else {
        continue; // skip generic sentences
      }
    }

    if (!label) label = sentence.split(" ").slice(0, 5).join(" ");

    // Deduplicate by label similarity
    const alreadyExists = extracted.some(
      (n) => n.label.toLowerCase().slice(0, 15) === label.toLowerCase().slice(0, 15)
    );
    if (alreadyExists) continue;

    const nodeId = generateId();
    const node: KnowledgeNode = {
      id: nodeId,
      label: label.slice(0, 50),
      content: sentence.slice(0, 300),
      type,
      agentId,
      timestamp: Date.now(),
      connections: [],
    };
    extracted.push(node);
  }

  // Auto-connect nodes that share meaningful words
  for (let i = 0; i < extracted.length; i++) {
    for (let j = i + 1; j < extracted.length; j++) {
      const aWords = new Set(
        extracted[i].content.toLowerCase().split(/\W+/).filter((w) => w.length > 5)
      );
      const bWords = extracted[j].content.toLowerCase().split(/\W+/).filter((w) => w.length > 5);
      const shared = bWords.filter((w) => aWords.has(w));
      if (shared.length >= 2) {
        addEdge({
          source: extracted[i].id,
          target: extracted[j].id,
          label: shared.slice(0, 2).join(", "),
          weight: shared.length,
        });
      }
    }
  }

  // Connect to existing graph nodes
  for (const newNode of extracted) {
    const newWords = new Set(
      newNode.content.toLowerCase().split(/\W+/).filter((w) => w.length > 5)
    );
    for (const existing of nodes) {
      const existingWords = existing.content.toLowerCase().split(/\W+/).filter((w) => w.length > 5);
      const shared = existingWords.filter((w) => newWords.has(w));
      if (shared.length >= 2) {
        addEdge({
          source: existing.id,
          target: newNode.id,
          label: shared.slice(0, 2).join(", "),
          weight: shared.length,
        });
      }
    }
    addNode(newNode);
  }

  return extracted;
}

// Seed with mock data for demo
export function seedMockData(): void {
  if (nodes.length > 0) return;

  const mockNodes: KnowledgeNode[] = [
    {
      id: "n1", label: "Large Language Models", content: "Large Language Models are neural networks trained on vast text corpora to understand and generate human language.", type: "concept", agentId: "claude", timestamp: Date.now() - 5000, connections: ["n2", "n3"],
    },
    {
      id: "n2", label: "Transformer Architecture", content: "The Transformer architecture is the foundational design behind modern LLMs, using self-attention mechanisms.", type: "fact", agentId: "openai", timestamp: Date.now() - 4500, connections: ["n1", "n4"],
    },
    {
      id: "n3", label: "Emergent Capabilities", content: "Emergent capabilities are abilities that appear in large models but not smaller ones, suggesting qualitative phase transitions.", type: "insight", agentId: "gemini", timestamp: Date.now() - 4000, connections: ["n1", "n5"],
    },
    {
      id: "n4", label: "Self-Attention Mechanism", content: "The self-attention mechanism allows tokens to attend to all other tokens in a sequence, enabling global context understanding.", type: "concept", agentId: "claude", timestamp: Date.now() - 3500, connections: ["n2"],
    },
    {
      id: "n5", label: "Why do models hallucinate?", content: "Why do models hallucinate facts that are not in their training data?", type: "question", agentId: "openai", timestamp: Date.now() - 3000, connections: ["n3", "n6"],
    },
    {
      id: "n6", label: "Token Prediction", content: "Token prediction is the core training objective — models learn to predict the next token, which gives rise to broader reasoning.", type: "fact", agentId: "gemini", timestamp: Date.now() - 2500, connections: ["n5"],
    },
  ];

  const mockEdges: KnowledgeEdge[] = [
    { source: "n1", target: "n2", label: "uses", weight: 3 },
    { source: "n1", target: "n3", label: "exhibits", weight: 2 },
    { source: "n2", target: "n4", label: "contains", weight: 3 },
    { source: "n3", target: "n5", label: "raises", weight: 2 },
    { source: "n5", target: "n6", label: "relates to", weight: 2 },
  ];

  nodes = mockNodes;
  edges = mockEdges;
}

export type LLMProvider = "claude" | "openai" | "gemini";

export interface Agent {
  id: string;
  name: string;
  provider: LLMProvider;
  model: string;
  role: string;
  systemPrompt: string;
  color: string;
  enabled: boolean;
  apiKey: string;
}

export interface Message {
  id: string;
  agentId: string | "user" | "system";
  content: string;
  timestamp: number;
  type: "user" | "agent" | "system";
  thinking?: string;
}

export interface AgentConversation {
  id: string;
  agents: Agent[];
  messages: Message[];
  status: "idle" | "running" | "complete" | "error";
}

export interface KnowledgeNode {
  id: string;
  label: string;
  content: string;
  type: "concept" | "fact" | "question" | "insight";
  agentId: string;
  timestamp: number;
  connections: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  label: string;
  weight: number;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

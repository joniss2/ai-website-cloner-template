"use client";

import { useState, useCallback } from "react";
import { AgentCard } from "@/components/AgentCard";
import { AgentChat } from "@/components/AgentChat";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import type { Agent, Message, KnowledgeNode, KnowledgeGraph as KGType } from "@/types/agency";
import { seedMockData, getGraph } from "@/lib/knowledge-store";

// Seed demo data on initial load
if (typeof window !== "undefined") {
  seedMockData();
}

const DEFAULT_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Researcher",
    provider: "claude",
    model: "claude-opus-4-5",
    role: "Research Analyst",
    systemPrompt: "You are a thorough research analyst. Your job is to analyze the given task, break it into components, gather relevant facts, and identify key concepts. Be precise and cite your reasoning. Focus on breadth of coverage.",
    color: "#a78bfa",
    enabled: true,
    apiKey: "",
  },
  {
    id: "agent-2",
    name: "Analyst",
    provider: "openai",
    model: "gpt-4o",
    role: "Critical Analyst",
    systemPrompt: "You are a critical analyst. Review the research provided and add depth: identify patterns, contradictions, implications, and overlooked angles. Build on what was found, don't repeat it.",
    color: "#34d399",
    enabled: true,
    apiKey: "",
  },
  {
    id: "agent-3",
    name: "Synthesizer",
    provider: "gemini",
    model: "gemini-1.5-pro",
    role: "Synthesis Engine",
    systemPrompt: "You are a synthesis engine. Take the research and analysis provided and distill it into a clear, actionable synthesis. Surface key insights, draw conclusions, and present a unified perspective.",
    color: "#60a5fa",
    enabled: true,
    apiKey: "",
  },
];

export default function AgencyPage() {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [graph, setGraph] = useState<KGType>(() => {
    if (typeof window !== "undefined") return getGraph();
    return { nodes: [], edges: [] };
  });
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [showGraph, setShowGraph] = useState(true);
  const [graphTab, setGraphTab] = useState<"graph" | "detail">("graph");

  function updateAgent(updated: Agent) {
    setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  }

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  async function handleRunAgency(task: string) {
    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      agentId: "user",
      content: task,
      timestamp: Date.now(),
      type: "user",
    };
    addMessage(userMsg);
    setIsRunning(true);

    try {
      const res = await fetch("/api/agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          agents,
          apiKeys: Object.fromEntries(agents.map((a) => [a.id, a.apiKey])),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json() as { responses: Message[]; knowledgeGraph: KGType };
      for (const msg of data.responses) {
        addMessage(msg);
      }
      setGraph(data.knowledgeGraph);
    } catch (err) {
      const sysMsg: Message = {
        id: Math.random().toString(36).slice(2),
        agentId: "system",
        content: `Agency run failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        timestamp: Date.now(),
        type: "system",
      };
      addMessage(sysMsg);
    } finally {
      setIsRunning(false);
    }
  }

  async function handleSendMessage(content: string) {
    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      agentId: "user",
      content,
      timestamp: Date.now(),
      type: "user",
    };
    addMessage(userMsg);

    const enabledAgent = agents.find((a) => a.enabled);
    if (!enabledAgent) return;

    setIsRunning(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content }],
          provider: enabledAgent.provider,
          model: enabledAgent.model,
          systemPrompt: enabledAgent.systemPrompt,
          apiKey: enabledAgent.apiKey,
        }),
      });

      const data = await res.json() as { text?: string; error?: string };
      const agentMsg: Message = {
        id: Math.random().toString(36).slice(2),
        agentId: enabledAgent.id,
        content: data.text ?? data.error ?? "No response",
        timestamp: Date.now(),
        type: data.error ? "system" : "agent",
      };
      addMessage(agentMsg);
    } catch (err) {
      addMessage({
        id: Math.random().toString(36).slice(2),
        agentId: "system",
        content: `Error: ${err instanceof Error ? err.message : "Unknown"}`,
        timestamp: Date.now(),
        type: "system",
      });
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="agency-layout">
      {/* Header */}
      <header className="agency-header">
        <div className="header-left">
          <div className="header-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="3" fill="#a78bfa" />
              <circle cx="5" cy="19" r="3" fill="#34d399" />
              <circle cx="19" cy="19" r="3" fill="#60a5fa" />
              <path d="M12 8v4m-4.5 4l3.5-4 3.5 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">LLM Agency</h1>
            <p className="header-sub">Multi-model orchestration + knowledge graph</p>
          </div>
        </div>
        <div className="header-right">
          <button
            className={`graph-toggle ${showGraph ? "graph-toggle-active" : ""}`}
            onClick={() => setShowGraph(!showGraph)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
              <line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" />
            </svg>
            Knowledge Graph
          </button>
        </div>
      </header>

      {/* Main grid */}
      <div className={`agency-grid ${showGraph ? "with-graph" : "without-graph"}`}>
        {/* Sidebar */}
        <aside className="agents-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-label">Agents</span>
            <span className="sidebar-hint">Configure each agent below</span>
          </div>
          <div className="agents-list">
            {agents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} onChange={updateAgent} index={i} />
            ))}
          </div>
        </aside>

        {/* Chat */}
        <main className="chat-main">
          <AgentChat
            agents={agents}
            messages={messages}
            onSendMessage={handleSendMessage}
            onRunAgency={handleRunAgency}
            isRunning={isRunning}
          />
        </main>

        {/* Knowledge panel */}
        {showGraph && (
          <aside className="graph-panel">
            <div className="graph-panel-header">
              <button
                className={`graph-tab ${graphTab === "graph" ? "graph-tab-active" : ""}`}
                onClick={() => setGraphTab("graph")}
              >Graph</button>
              <button
                className={`graph-tab ${graphTab === "detail" ? "graph-tab-active" : ""}`}
                onClick={() => setGraphTab("detail")}
              >
                Node detail
                {selectedNode && <span className="dot-badge" />}
              </button>
            </div>

            {graphTab === "graph" ? (
              <KnowledgeGraph
                graph={graph}
                onNodeClick={(node) => {
                  setSelectedNode(node);
                  setGraphTab("detail");
                }}
              />
            ) : (
              <div className="node-detail-panel">
                {selectedNode ? (
                  <>
                    <div className="node-detail-type" style={{
                      color: { concept: "#60a5fa", fact: "#34d399", question: "#fb923c", insight: "#a78bfa" }[selectedNode.type]
                    }}>
                      {selectedNode.type}
                    </div>
                    <h3 className="node-detail-label">{selectedNode.label}</h3>
                    <p className="node-detail-content">{selectedNode.content}</p>
                    <div className="node-detail-meta">
                      <div className="node-detail-row">
                        <span className="node-detail-key">Agent</span>
                        <span className="node-detail-val font-mono">{selectedNode.agentId}</span>
                      </div>
                      <div className="node-detail-row">
                        <span className="node-detail-key">Connections</span>
                        <span className="node-detail-val">{selectedNode.connections.length}</span>
                      </div>
                      <div className="node-detail-row">
                        <span className="node-detail-key">Timestamp</span>
                        <span className="node-detail-val font-mono">
                          {new Date(selectedNode.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <button className="back-to-graph" onClick={() => setGraphTab("graph")}>
                      ← Back to graph
                    </button>
                  </>
                ) : (
                  <div className="node-detail-empty">
                    <p>Click a node in the graph to see its details.</p>
                  </div>
                )}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

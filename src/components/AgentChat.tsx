"use client";

import { useRef, useEffect, useState } from "react";
import type { Agent, Message } from "@/types/agency";

const PROVIDER_COLORS: Record<string, string> = {
  claude: "#a78bfa",
  openai: "#34d399",
  gemini: "#60a5fa",
};

interface AgentChatProps {
  agents: Agent[];
  messages: Message[];
  onSendMessage: (content: string) => void;
  onRunAgency: (task: string) => void;
  isRunning: boolean;
}

function MessageBubble({ message, agents }: { message: Message; agents: Agent[] }) {
  const isUser = message.type === "user";
  const isSystem = message.type === "system";
  const agent = agents.find((a) => a.id === message.agentId);
  const color = agent ? PROVIDER_COLORS[agent.provider] : "#6b7280";

  if (isSystem) {
    return (
      <div className="system-message">
        <span className="system-dot" />
        <span>{message.content}</span>
      </div>
    );
  }

  return (
    <div className={`message-bubble ${isUser ? "user-bubble" : "agent-bubble"}`}>
      {!isUser && agent && (
        <div className="message-meta" style={{ color }}>
          <span className="agent-dot" style={{ background: color }} />
          <span className="agent-name-tag">{agent.name}</span>
          <span className="agent-role-tag">{agent.role}</span>
        </div>
      )}
      <div
        className={`message-content ${isUser ? "message-content-user" : "message-content-agent"}`}
        style={!isUser ? { borderLeftColor: color } : undefined}
      >
        {message.content.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}

function TypingIndicator({ agents }: { agents: Agent[] }) {
  return (
    <div className="typing-indicator">
      {agents.filter((a) => a.enabled).map((agent) => (
        <div key={agent.id} className="typing-agent">
          <span className="typing-name" style={{ color: PROVIDER_COLORS[agent.provider] }}>
            {agent.name}
          </span>
          <span className="typing-dots">
            <span /><span /><span />
          </span>
        </div>
      ))}
    </div>
  );
}

export function AgentChat({ agents, messages, onSendMessage, onRunAgency, isRunning }: AgentChatProps) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "agency">("agency");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isRunning]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isRunning) return;
    const task = input.trim();
    setInput("");
    if (mode === "agency") {
      onRunAgency(task);
    } else {
      onSendMessage(task);
    }
  }

  const enabledCount = agents.filter((a) => a.enabled).length;

  return (
    <div className="chat-container">
      <div className="chat-mode-bar">
        <button
          className={`mode-btn ${mode === "agency" ? "mode-active" : ""}`}
          onClick={() => setMode("agency")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
            <path d="M12 8v4m-4.5 4l3.5-4 3.5 4" />
          </svg>
          Agency Mode
        </button>
        <button
          className={`mode-btn ${mode === "chat" ? "mode-active" : ""}`}
          onClick={() => setMode("chat")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Single Chat
        </button>
        <span className="agent-count-badge">
          {enabledCount} agent{enabledCount !== 1 ? "s" : ""} active
        </span>
      </div>

      <div className="messages-scroll" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
                <path d="M12 8v4m-4.5 4l3.5-4 3.5 4" />
              </svg>
            </div>
            <p className="empty-title">Agency ready</p>
            <p className="empty-subtitle">Enter a task below to start the multi-agent workflow. Each agent will build on the previous one's output.</p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} agents={agents} />
        ))}
        {isRunning && <TypingIndicator agents={agents} />}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <textarea
            className="chat-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "agency" ? "Enter a task for all agents to collaborate on..." : "Send a message..."}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isRunning}
          />
          <button
            type="submit"
            className={`send-btn ${isRunning ? "send-btn-loading" : ""}`}
            disabled={isRunning || !input.trim()}
          >
            {isRunning ? (
              <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
        <div className="input-hint">
          {mode === "agency"
            ? `Runs sequentially through ${enabledCount} agent${enabledCount !== 1 ? "s" : ""}. Each response feeds the next.`
            : "Shift+Enter for new line. Enter to send."}
        </div>
      </form>
    </div>
  );
}

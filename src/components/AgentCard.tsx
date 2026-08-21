"use client";

import { useState } from "react";
import type { Agent, LLMProvider } from "@/types/agency";

const PROVIDER_MODELS: Record<LLMProvider, string[]> = {
  claude: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5"],
  openai: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  gemini: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash"],
};

const PROVIDER_LABELS: Record<LLMProvider, string> = {
  claude: "Claude",
  openai: "GPT",
  gemini: "Gemini",
};

const PROVIDER_COLORS: Record<LLMProvider, string> = {
  claude: "#a78bfa",
  openai: "#34d399",
  gemini: "#60a5fa",
};

interface AgentCardProps {
  agent: Agent;
  onChange: (updated: Agent) => void;
  index: number;
}

export function AgentCard({ agent, onChange, index }: AgentCardProps) {
  const [showKey, setShowKey] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const color = PROVIDER_COLORS[agent.provider];

  function update(patch: Partial<Agent>) {
    onChange({ ...agent, ...patch });
  }

  return (
    <div
      className="agent-card"
      style={{ "--agent-color": color } as React.CSSProperties}
    >
      <div className="agent-card-header">
        <div className="agent-identity">
          <div className="agent-index">{index + 1}</div>
          <div>
            <input
              className="agent-name-input"
              value={agent.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Agent name"
            />
            <div className="agent-role-input-wrap">
              <input
                className="agent-role-input"
                value={agent.role}
                onChange={(e) => update({ role: e.target.value })}
                placeholder="Role (e.g. Researcher)"
              />
            </div>
          </div>
        </div>
        <div className="agent-controls">
          <label className="toggle-wrap" title={agent.enabled ? "Enabled" : "Disabled"}>
            <input
              type="checkbox"
              checked={agent.enabled}
              onChange={(e) => update({ enabled: e.target.checked })}
              className="sr-only"
            />
            <span className={`toggle ${agent.enabled ? "toggle-on" : ""}`} />
          </label>
          <button
            className="expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d={expanded ? "M2 9l5-5 5 5" : "M2 5l5 5 5-5"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="provider-row">
        {(["claude", "openai", "gemini"] as LLMProvider[]).map((p) => (
          <button
            key={p}
            className={`provider-chip ${agent.provider === p ? "active" : ""}`}
            style={agent.provider === p ? { "--chip-color": PROVIDER_COLORS[p] } as React.CSSProperties : undefined}
            onClick={() => update({ provider: p, model: PROVIDER_MODELS[p][0] })}
          >
            {PROVIDER_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="model-row">
        <select
          className="model-select"
          value={agent.model}
          onChange={(e) => update({ model: e.target.value })}
        >
          {PROVIDER_MODELS[agent.provider].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="api-key-row">
        <div className="api-key-field">
          <input
            type={showKey ? "text" : "password"}
            className="api-key-input font-mono"
            value={agent.apiKey}
            onChange={(e) => update({ apiKey: e.target.value })}
            placeholder="API key"
            autoComplete="off"
          />
          <button className="key-toggle" onClick={() => setShowKey(!showKey)} title={showKey ? "Hide" : "Show"}>
            {showKey ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="system-prompt-section">
          <label className="system-prompt-label">System prompt</label>
          <textarea
            className="system-prompt-input"
            value={agent.systemPrompt}
            onChange={(e) => update({ systemPrompt: e.target.value })}
            rows={4}
            placeholder="Define this agent's role, expertise, and behavior..."
          />
        </div>
      )}
    </div>
  );
}

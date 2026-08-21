import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { extractKnowledge, getGraph, addNode, addEdge } from "@/lib/knowledge-store";
import type { Agent, Message, KnowledgeGraph } from "@/types/agency";

interface AgencyRequestBody {
  task: string;
  agents: Agent[];
  apiKeys: Record<string, string>;
}

interface AgencyResponse {
  responses: Message[];
  knowledgeGraph: KnowledgeGraph;
}

export async function POST(req: NextRequest) {
  let body: AgencyRequestBody;
  try {
    body = await req.json() as AgencyRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { task, agents, apiKeys } = body;
  const enabledAgents = agents.filter((a) => a.enabled);

  if (enabledAgents.length === 0) {
    return NextResponse.json({ error: "No agents enabled" }, { status: 400 });
  }

  const responses: Message[] = [];
  let context = `Task: ${task}\n\n`;

  for (const agent of enabledAgents) {
    const apiKey = apiKeys[agent.id] ?? agent.apiKey;
    if (!apiKey) {
      const errMsg: Message = {
        id: Math.random().toString(36).slice(2),
        agentId: agent.id,
        content: `[Skipped — no API key for ${agent.name}]`,
        timestamp: Date.now(),
        type: "system",
      };
      responses.push(errMsg);
      continue;
    }

    const systemPrompt = agent.systemPrompt || `You are ${agent.name}, a ${agent.role}.`;
    const userContent = context.length > 500
      ? `${task}\n\nPrevious context:\n${context.slice(-1500)}`
      : task;

    try {
      let text = "";

      if (agent.provider === "claude") {
        const client = new Anthropic({ apiKey });
        const resp = await client.messages.create({
          model: agent.model,
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: "user", content: userContent }],
        });
        const block = resp.content.find((b) => b.type === "text");
        text = block && block.type === "text" ? block.text : "";
      } else if (agent.provider === "openai") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: agent.model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userContent },
            ],
            max_tokens: 4000,
          }),
        });
        if (!res.ok) throw new Error(`OpenAI ${res.status}`);
        const data = await res.json() as { choices: Array<{ message: { content: string } }> };
        text = data.choices[0]?.message?.content ?? "";
      } else if (agent.provider === "gemini") {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${agent.model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: "user", parts: [{ text: userContent }] }],
              generationConfig: { maxOutputTokens: 4000 },
            }),
          }
        );
        if (!res.ok) throw new Error(`Gemini ${res.status}`);
        const data = await res.json() as {
          candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
        };
        text = data.candidates[0]?.content?.parts?.[0]?.text ?? "";
      }

      const agentMsg: Message = {
        id: Math.random().toString(36).slice(2),
        agentId: agent.id,
        content: text,
        timestamp: Date.now(),
        type: "agent",
      };
      responses.push(agentMsg);

      // Extract knowledge and add to graph
      const newNodes = extractKnowledge(text, agent.id);
      for (const node of newNodes) {
        addNode(node);
      }
      // Connect nodes from this agent to previous agent's nodes if related
      if (responses.length > 1 && newNodes.length > 0) {
        const prevMsg = responses[responses.length - 2];
        if (prevMsg.type === "agent") {
          // Cross-agent connection via shared task context
          addEdge({
            source: newNodes[0].id,
            target: newNodes[Math.max(0, newNodes.length - 1)].id,
            label: "synthesizes",
            weight: 1,
          });
        }
      }

      context += `\n\n${agent.name} (${agent.role}):\n${text}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      const errMsg: Message = {
        id: Math.random().toString(36).slice(2),
        agentId: agent.id,
        content: `Error from ${agent.name}: ${message}`,
        timestamp: Date.now(),
        type: "system",
      };
      responses.push(errMsg);
    }
  }

  const knowledgeGraph = getGraph();
  const result: AgencyResponse = { responses, knowledgeGraph };
  return NextResponse.json(result);
}

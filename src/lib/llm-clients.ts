import Anthropic from "@anthropic-ai/sdk";
import type { LLMProvider } from "@/types/agency";

export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

export async function callLLM(
  provider: LLMProvider,
  model: string,
  messages: LLMMessage[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) throw new Error(`No API key provided for ${provider}`);

  if (provider === "claude") {
    return callClaude(model, messages, systemPrompt, apiKey);
  } else if (provider === "openai") {
    return callOpenAI(model, messages, systemPrompt, apiKey);
  } else if (provider === "gemini") {
    return callGemini(model, messages, systemPrompt, apiKey);
  }
  throw new Error(`Unknown provider: ${provider}`);
}

async function callClaude(
  model: string,
  messages: LLMMessage[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.messages.create({
    model,
    max_tokens: 8000,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("No text in response");
  return textBlock.text;
}

async function callOpenAI(
  model: string,
  messages: LLMMessage[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${err}`);
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0]?.message?.content ?? "";
}

async function callGemini(
  model: string,
  messages: LLMMessage[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 4000 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error ${response.status}: ${err}`);
  }

  const data = await response.json() as {
    candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
  };
  return data.candidates[0]?.content?.parts?.[0]?.text ?? "";
}

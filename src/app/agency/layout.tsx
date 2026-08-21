import type { Metadata } from "next";
import "./agency.css";

export const metadata: Metadata = {
  title: "LLM Agency",
  description: "Multi-model AI orchestration with a live knowledge graph",
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

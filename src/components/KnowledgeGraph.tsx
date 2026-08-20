"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { KnowledgeGraph as KGType, KnowledgeNode, KnowledgeEdge } from "@/types/agency";

const NODE_COLORS: Record<KnowledgeNode["type"], string> = {
  concept: "#60a5fa",
  fact: "#34d399",
  question: "#fb923c",
  insight: "#a78bfa",
};

const NODE_GLOW: Record<KnowledgeNode["type"], string> = {
  concept: "rgba(96, 165, 250, 0.4)",
  fact: "rgba(52, 211, 153, 0.4)",
  question: "rgba(251, 146, 60, 0.4)",
  insight: "rgba(167, 139, 250, 0.4)",
};

interface NodeWithPos extends KnowledgeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function layoutNodes(nodes: KnowledgeNode[], edges: KnowledgeEdge[], width: number, height: number): NodeWithPos[] {
  const positioned: NodeWithPos[] = nodes.map((n, i) => ({
    ...n,
    x: n.x ?? (width / 2 + (Math.random() - 0.5) * width * 0.6),
    y: n.y ?? (height / 2 + (Math.random() - 0.5) * height * 0.6),
    vx: n.vx ?? 0,
    vy: n.vy ?? 0,
  }));

  // Run spring simulation
  const ITERATIONS = 80;
  const REPULSION = 3000;
  const ATTRACTION = 0.04;
  const DAMPING = 0.85;
  const CENTER_PULL = 0.008;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    // Repulsion between all pairs
    for (let i = 0; i < positioned.length; i++) {
      for (let j = i + 1; j < positioned.length; j++) {
        const dx = positioned[j].x - positioned[i].x;
        const dy = positioned[j].y - positioned[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const force = REPULSION / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        positioned[i].vx -= fx;
        positioned[i].vy -= fy;
        positioned[j].vx += fx;
        positioned[j].vy += fy;
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const src = positioned.find((n) => n.id === edge.source);
      const tgt = positioned.find((n) => n.id === edge.target);
      if (!src || !tgt) continue;
      const dx = tgt.x - src.x;
      const dy = tgt.y - src.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const force = ATTRACTION * dist * (edge.weight ?? 1);
      src.vx += (dx / dist) * force;
      src.vy += (dy / dist) * force;
      tgt.vx -= (dx / dist) * force;
      tgt.vy -= (dy / dist) * force;
    }

    // Center gravity
    for (const n of positioned) {
      n.vx += (width / 2 - n.x) * CENTER_PULL;
      n.vy += (height / 2 - n.y) * CENTER_PULL;
    }

    // Apply velocity + damping + boundary
    for (const n of positioned) {
      n.vx *= DAMPING;
      n.vy *= DAMPING;
      n.x = Math.max(40, Math.min(width - 40, n.x + n.vx));
      n.y = Math.max(40, Math.min(height - 40, n.y + n.vy));
    }
  }

  return positioned;
}

interface TooltipState {
  node: NodeWithPos | null;
  x: number;
  y: number;
}

interface KnowledgeGraphProps {
  graph: KGType;
  onNodeClick?: (node: KnowledgeNode) => void;
}

export function KnowledgeGraph({ graph, onNodeClick }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 500, h: 500 });
  const [layoutNodes_, setLayoutNodes] = useState<NodeWithPos[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState>({ node: null, x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, scale: 1 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-layout when graph changes
  useEffect(() => {
    if (graph.nodes.length === 0) {
      setLayoutNodes([]);
      return;
    }
    const laid = layoutNodes(graph.nodes, graph.edges, dimensions.w, dimensions.h);
    setLayoutNodes(laid);
  }, [graph, dimensions]);

  const getNodeRadius = (node: NodeWithPos) =>
    Math.max(18, Math.min(32, 18 + node.connections.length * 3));

  // Zoom on wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    setViewBox((vb) => ({
      ...vb,
      scale: Math.max(0.3, Math.min(4, vb.scale * factor)),
    }));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest(".graph-node")) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, vx: viewBox.x, vy: viewBox.y };
  }, [viewBox]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = (e.clientX - panStart.current.x) / viewBox.scale;
    const dy = (e.clientY - panStart.current.y) / viewBox.scale;
    setViewBox((vb) => ({ ...vb, x: panStart.current.vx - dx, y: panStart.current.vy - dy }));
  }, [viewBox.scale]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const vbStr = `${viewBox.x} ${viewBox.y} ${dimensions.w / viewBox.scale} ${dimensions.h / viewBox.scale}`;

  return (
    <div className="kg-container" ref={containerRef}>
      <div className="kg-legend">
        {(["concept", "fact", "question", "insight"] as const).map((t) => (
          <div key={t} className="legend-item">
            <span className="legend-dot" style={{ background: NODE_COLORS[t] }} />
            <span>{t}</span>
          </div>
        ))}
      </div>

      {graph.nodes.length === 0 ? (
        <div className="kg-empty">
          <div className="kg-empty-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="24" cy="12" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="12" cy="36" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="36" cy="36" r="4" fill="currentColor" opacity="0.3" />
              <line x1="24" y1="16" x2="14" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="24" y1="16" x2="34" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
          <p className="kg-empty-title">Graph populates as agents respond</p>
          <p className="kg-empty-sub">Concepts, facts, questions, and insights extracted from responses appear as nodes</p>
        </div>
      ) : (
        <svg
          ref={svgRef}
          className="kg-svg"
          viewBox={vbStr}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isPanning.current ? "grabbing" : "grab" }}
        >
          <defs>
            {(["concept", "fact", "question", "insight"] as const).map((t) => (
              <filter key={t} id={`glow-${t}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={NODE_GLOW[t]} result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 Z" fill="rgba(100,116,139,0.5)" />
            </marker>
          </defs>

          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const src = layoutNodes_.find((n) => n.id === edge.source);
            const tgt = layoutNodes_.find((n) => n.id === edge.target);
            if (!src || !tgt) return null;
            const mx = (src.x + tgt.x) / 2;
            const my = (src.y + tgt.y) / 2;
            return (
              <g key={i}>
                <line
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke="rgba(100,116,139,0.3)"
                  strokeWidth={Math.max(1, edge.weight ?? 1)}
                  markerEnd="url(#arrowhead)"
                />
                {edge.label && (
                  <text
                    x={mx} y={my}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fill="rgba(148,163,184,0.6)"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {layoutNodes_.map((node) => {
            const r = getNodeRadius(node);
            const color = NODE_COLORS[node.type];
            const isSelected = selectedNode === node.id;
            return (
              <g
                key={node.id}
                className="graph-node"
                transform={`translate(${node.x},${node.y})`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedNode(isSelected ? null : node.id);
                  onNodeClick?.(node);
                }}
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    node,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseLeave={() => setTooltip({ node: null, x: 0, y: 0 })}
              >
                {/* Glow ring on selected */}
                {isSelected && (
                  <circle r={r + 8} fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
                )}
                <circle
                  r={r}
                  fill={`color-mix(in srgb, ${color} 15%, transparent)`}
                  stroke={color}
                  strokeWidth={isSelected ? 2 : 1}
                  filter={`url(#glow-${node.type})`}
                />
                {/* Type icon abbreviation */}
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fill={color}
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.7"
                  y={-4}
                >
                  {node.type.slice(0, 3).toUpperCase()}
                </text>
                {/* Label below */}
                <text
                  textAnchor="middle"
                  y={r + 14}
                  fontSize="10"
                  fill="rgba(203,213,225,0.85)"
                  fontFamily="Space Grotesk, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {node.label.length > 20 ? node.label.slice(0, 18) + "…" : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* Tooltip */}
      {tooltip.node && (
        <div
          className="kg-tooltip"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <div className="kg-tooltip-type" style={{ color: NODE_COLORS[tooltip.node.type] }}>
            {tooltip.node.type}
          </div>
          <div className="kg-tooltip-label">{tooltip.node.label}</div>
          <div className="kg-tooltip-content">{tooltip.node.content.slice(0, 120)}{tooltip.node.content.length > 120 ? "…" : ""}</div>
        </div>
      )}

      {/* Controls */}
      <div className="kg-controls">
        <button className="kg-ctrl-btn" onClick={() => setViewBox({ x: 0, y: 0, scale: 1 })} title="Reset view">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1018 0A9 9 0 003 12z" /><path d="M12 8v4l3 3" />
          </svg>
        </button>
        <button className="kg-ctrl-btn" onClick={() => setViewBox((v) => ({ ...v, scale: Math.min(4, v.scale * 1.2) }))} title="Zoom in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button className="kg-ctrl-btn" onClick={() => setViewBox((v) => ({ ...v, scale: Math.max(0.3, v.scale * 0.8) }))} title="Zoom out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
      </div>

      <div className="kg-stats">
        {graph.nodes.length} nodes · {graph.edges.length} edges
      </div>
    </div>
  );
}

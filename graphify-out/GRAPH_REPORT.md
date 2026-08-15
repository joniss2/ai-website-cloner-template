# Graph Report - ai-website-cloner-template  (2026-08-15)

## Corpus Check
- 54 files · ~78,109 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 247 nodes · 255 edges · 26 communities (13 shown, 13 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Page Components
- Agent Instructions & Docs
- Package Metadata
- shadcn/ui Configuration
- Frontend Dependencies
- Dev Tooling
- TypeScript Config
- Cross-Platform AI Skills
- Next.js Type References
- IDE & AI Tool Config
- Build Scripts
- Skill Sync Pipeline
- UI Primitives
- Agent Rule Sync
- App Layout
- Recon Script
- Issue Templates
- ESLint Config
- CI & GitHub Actions
- Next.js Config
- PostCSS Config
- GitHub Funding
- Issue Template Config
- PR Template
- Docker Dev
- Docker Production

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Clone Website Skill (GitHub Copilot)` - 12 edges
3. `keywords` - 9 edges
4. `Claude Clone Website Skill (Canonical Source)` - 9 edges
5. `scripts` - 7 edges
6. `include` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `Agent Instructions (AGENTS.md)` - 6 edges
10. `AGENTS.md — Canonical Project Rules Source` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Codex Clone Website Skill` --semantically_similar_to--> `Claude Clone Website Skill (Canonical Source)`  [INFERRED] [semantically similar]
  .codex/skills/clone-website/SKILL.md → .claude/skills/clone-website/SKILL.md
- `Design Token Extraction (colors, typography, spacing, shadows)` --semantically_similar_to--> `Clone Website Skill (GitHub Copilot)`  [INFERRED] [semantically similar]
  docs/research/INSPECTION_GUIDE.md → .github/skills/clone-website/SKILL.md
- `Clone Website Command (OpenCode)` --semantically_similar_to--> `Clone Website Skill (GitHub Copilot)`  [INFERRED] [semantically similar]
  .opencode/commands/clone-website.md → .github/skills/clone-website/SKILL.md
- `Clone Website Workflow (Windsurf)` --semantically_similar_to--> `Clone Website Skill (GitHub Copilot)`  [INFERRED] [semantically similar]
  .windsurf/workflows/clone-website.md → .github/skills/clone-website/SKILL.md
- `Clone Website Command (OpenCode)` --semantically_similar_to--> `Clone Website Workflow (Windsurf)`  [INFERRED] [semantically similar]
  .opencode/commands/clone-website.md → .windsurf/workflows/clone-website.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Platform Rule Files Auto-Generated from AGENTS.md** — _amazonq_rules_project, _continue_rules_project, _github_copilot_instructions [EXTRACTED 1.00]
- **Platform Clone-Website Commands Derived from Claude SKILL.md** — _augment_commands_clone_website, _continue_commands_clone_website, _cursor_commands_clone_website, _codex_skills_clone_website_skill [INFERRED 0.90]
- **GitHub Contribution Templates** — _github_issue_template_bug_report, _github_issue_template_feature_request, _github_pull_request_template, _github_issue_template_config [INFERRED 0.85]
- **Multi-Platform Clone-Website Skill Distribution** — github_skills_clone_website_skill_md_clone_website_skill, opencode_commands_clone_website_md_clone_website_command, windsurf_workflows_clone_website_md_clone_website_workflow [EXTRACTED 0.95]
- **Build Quality Gate Chain (install, lint, typecheck, build)** — github_copilot_setup_steps_yml_install_dependencies, github_workflows_ci_yml_ci_workflow, github_skills_clone_website_skill_md_clone_website_skill [INFERRED 0.75]
- **Agent Instructions Single Source of Truth (AGENTS.md)** — agents_md_agent_instructions, claude_md_claude_config, gemini_md_gemini_config [EXTRACTED 1.00]

## Communities (26 total, 13 thin omitted)

### Community 0 - "UI Page Components"
Cohesion: 0.06
Nodes (25): CalculatorSection(), formatRange(), incomeStreams, ComparisonSection(), CtaSection(), faqs, FaqSection(), Footer() (+17 more)

### Community 1 - "Agent Instructions & Docs"
Cohesion: 0.09
Nodes (25): Agent Instructions (AGENTS.md), Multi-Platform AI Agent Support, Pixel-Perfect Cloning Design Principle, Worktree Isolation Pattern for Parallel Builder Agents, Multi-URL Parallel Clone Support, Project Changelog, Claude Code Configuration (CLAUDE.md), Original vs Clone Side-by-Side Comparison (+17 more)

### Community 2 - "Package Metadata"
Cohesion: 0.08
Nodes (23): author, bugs, url, description, engines, node, homepage, keywords (+15 more)

### Community 3 - "shadcn/ui Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Frontend Dependencies"
Cohesion: 0.10
Nodes (21): @base-ui/react, class-variance-authority, clsx, lucide-react, next, dependencies, @base-ui/react, class-variance-authority (+13 more)

### Community 5 - "Dev Tooling"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, playwright, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 7 - "Cross-Platform AI Skills"
Cohesion: 0.31
Nodes (10): Augment Clone Website Command, Claude Clone Website Skill (Canonical Source), Codex Clone Website Skill, Continue Clone Website Command, Cursor Clone Website Command, Clone Website 5-Phase Workflow, Mandatory Component Spec File Pattern, Foreman-Builder Parallel Agent Dispatch Pattern (+2 more)

### Community 8 - "Next.js Type References"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 9 - "IDE & AI Tool Config"
Cohesion: 0.43
Nodes (7): Aider Configuration, Amazon Q Project Rules, Continue Project Rules, GitHub Copilot Instructions, AGENTS.md — Canonical Project Rules Source, Website Inspection Guide, sync-agent-rules.sh — Platform Rules Regeneration Script

### Community 10 - "Build Scripts"
Cohesion: 0.29
Nodes (7): scripts, build, check, dev, lint, start, typecheck

### Community 11 - "Skill Sync Pipeline"
Cohesion: 0.29
Nodes (4): geminiBody, match, ROOT, SOURCE

### Community 12 - "UI Primitives"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

## Knowledge Gaps
- **122 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+117 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Frontend Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tooling` to `Package Metadata`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Clone Website Skill (GitHub Copilot)` (e.g. with `Multi-URL Parallel Clone Support` and `Design Token Extraction (colors, typography, spacing, shadows)`) actually correct?**
  _`Clone Website Skill (GitHub Copilot)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _122 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05858585858585859 - nodes in this community are weakly interconnected._
- **Should `Agent Instructions & Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._
- **Should `Package Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
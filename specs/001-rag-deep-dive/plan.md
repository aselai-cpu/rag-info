# Implementation Plan: RAG Deep Dive Exploratory Website

**Branch**: `001-rag-deep-dive` | **Date**: 2026-02-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-rag-deep-dive/spec.md`

## Summary

Build a static educational website that teaches RAG (Retrieval Augmented
Generation) from first principles. The site progressively builds
understanding from "why RAG?" through Naive RAG, retrieval challenges
(symmetry problem, HyDE, HyPE, Hybrid RAG), to graph-based approaches
(GraphRAG, LightRAG, HippoRAG) including ontological analysis and
Personalized PageRank. Built with Astro + MDX for content-first
authoring, Mermaid for diagrams, and Vitest for testing.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Astro 5.x, MDX, Mermaid (build-time rendering)
**Storage**: N/A (static site, content in MDX files)
**Testing**: Vitest (unit/content validation), Playwright (e2e navigation)
**Target Platform**: Web browsers, static hosting (Vercel/Netlify/GitHub Pages)
**Project Type**: single (static site, no backend)
**Performance Goals**: All pages load in <3 seconds, zero runtime JS by default
**Constraints**: Static output only, no server-side rendering at runtime
**Scale/Scope**: ~15-20 content pages, 5 RAG approaches, ~30 diagrams

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Test-First | Tests MUST be written before implementation. Content validation tests written first, then pages. | PASS |
| II. Simplicity & YAGNI | Astro is the simplest viable framework for static content sites. No backend, no database, no auth. MDX for content, Mermaid for diagrams — no custom visualization framework. | PASS |
| III. Defensive Engineering | Strict TypeScript enforced. Content schemas validated via Zod. No user input to validate (read-only site). Minimal dependencies (Astro + MDX + Mermaid). | PASS |
| Development Workflow | Branch-based workflow on `001-rag-deep-dive`. Each user story independently deliverable. | PASS |
| Quality Gates | Vitest + type checking + linting in CI. | PASS |

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-deep-dive/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (content contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── config.ts                # Astro content collections schema
│   └── pages/
│       ├── 01-foundation/
│       │   ├── why-rag.mdx
│       │   ├── naive-rag.mdx
│       │   └── problem-tree.mdx
│       ├── 02-retrieval-strategies/
│       │   ├── symmetry-problem.mdx
│       │   ├── hyde.mdx
│       │   ├── hype.mdx
│       │   ├── asymmetric-embeddings.mdx
│       │   └── hybrid-rag.mdx
│       ├── 03-graph-rag/
│       │   ├── graphrag.mdx
│       │   ├── ontology.mdx
│       │   ├── lightrag.mdx
│       │   ├── hipporag.mdx
│       │   └── ppr.mdx
│       └── 04-synthesis/
│           ├── progressive-map.mdx
│           ├── indexing-comparison.mdx
│           └── decision-guide.mdx
├── components/
│   ├── Layout.astro             # Base page layout
│   ├── Navigation.astro         # Progressive + non-linear nav
│   ├── PrerequisiteBar.astro    # Shows required prior reading
│   ├── CrossReference.astro     # Inline links to related concepts
│   ├── ComparisonTable.astro    # Filterable comparison tables
│   ├── PathNotTaken.astro       # Callout for alternative approaches
│   ├── DiagramBlock.astro       # Mermaid diagram wrapper
│   └── ProgressTracker.astro    # Shows position in learning path
├── layouts/
│   └── PageLayout.astro         # Content page layout with nav + prereqs
├── pages/
│   ├── index.astro              # Landing page / entry point
│   └── [...slug].astro          # Dynamic route for all content pages
└── styles/
    └── global.css               # Site-wide styles

tests/
├── content/
│   ├── schema.test.ts           # Content schema validation
│   ├── crossrefs.test.ts        # All cross-references resolve
│   └── prerequisites.test.ts    # Prerequisite chains are acyclic
├── components/
│   ├── navigation.test.ts       # Nav structure tests
│   └── comparison.test.ts       # Comparison table rendering
└── e2e/
    ├── progressive-path.test.ts # Linear navigation works
    └── cross-navigation.test.ts # Non-linear jumps work

astro.config.mjs
tsconfig.json
vitest.config.ts
playwright.config.ts
package.json
```

**Structure Decision**: Single project structure. This is a static
content site with no backend. All source lives under `src/` with
content in MDX files organized by learning section. Tests validate
content integrity and navigation.

## Complexity Tracking

> No violations. All choices align with constitution principles.

| Check | Result |
|-------|--------|
| Framework choice | Astro is simplest viable option for static content |
| No unnecessary abstractions | Components map 1:1 to spec requirements |
| Dependency count | 4 runtime deps (Astro, MDX, Mermaid, rehype plugins) |

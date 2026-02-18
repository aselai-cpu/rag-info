# Implementation Plan: RAG Ontology with Competency Questions

**Branch**: `002-rag-ontology-cq` | **Date**: 2026-02-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-rag-ontology-cq/spec.md`

## Summary

Add 3 new content pages to the existing RAG Deep Dive site covering ontology engineering with Competency Questions (CQs), a visual RAG ontology map using Mermaid, and a foundational ontology comparison (DOLCE/BFO/SUMO). These pages extend the existing graph-rag section and integrate into the established navigation chain.

## Technical Context

**Language/Version**: TypeScript (strict) with Astro 5.x + MDX
**Primary Dependencies**: astro, @astrojs/mdx, mermaid (all already installed from feature 001)
**Storage**: N/A (static content site)
**Testing**: Vitest (content validation), Playwright (e2e navigation)
**Target Platform**: Static site (SSG), all modern browsers
**Project Type**: Single project (Astro static site, established in feature 001)
**Performance Goals**: Pages load in under 2 seconds, Mermaid diagrams render on desktop and mobile
**Constraints**: Must not break existing 16-page navigation chain; must pass all existing tests
**Scale/Scope**: 3 new MDX pages added to graph-rag section, extending page count from 16 to 19

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First (NON-NEGOTIABLE) | PASS | Content schema tests already exist and will validate new pages. E2e tests will be extended for new navigation paths. Tests written before content. |
| II. Simplicity & YAGNI | PASS | No new components needed — reuses existing DiagramBlock, CrossReference, PathNotTaken, ComparisonTable. Only new MDX content files. |
| III. Defensive Engineering | PASS | Content validated via Zod schema at build time. No user input, no external APIs, no security surface. Strict TypeScript enforced. |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/002-rag-ontology-cq/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # CQ methodology research
├── data-model.md        # Content schema extensions
├── quickstart.md        # Integration testing scenarios
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── components/          # No changes — reuse existing components
├── content/
│   └── pages/
│       └── 03-graph-rag/
│           ├── graphrag.mdx          # Existing
│           ├── ontology.mdx          # Existing
│           ├── lightrag.mdx          # Existing
│           ├── hipporag.mdx          # Existing
│           ├── ppr.mdx               # Existing
│           ├── competency-questions.mdx  # NEW (US1)
│           ├── rag-ontology-map.mdx      # NEW (US2)
│           └── foundational-ontologies.mdx # NEW (US3)
├── layouts/             # No changes
├── pages/               # No changes (dynamic [...slug].astro handles new pages)
└── styles/              # No changes

tests/
├── content/
│   ├── schema.test.ts       # Existing — must pass with 19 pages
│   ├── crossrefs.test.ts    # Existing — validates new cross-references
│   └── prerequisites.test.ts # Existing — validates no cycles
├── components/
│   └── navigation.test.ts   # Existing — must show pages in graph-rag section
└── e2e/
    └── ontology-navigation.test.ts  # NEW — e2e test for new page navigation
```

**Structure Decision**: Content-only addition to existing Astro static site. No new components, layouts, or configuration. Only new MDX content files and one new e2e test file.

## Navigation Chain Update

The existing linear path ends at `ppr → progressive-map`. The 3 new pages insert between `ppr` and `progressive-map`:

**Before**: `... → ppr → progressive-map → ...`
**After**: `... → ppr → competency-questions → rag-ontology-map → foundational-ontologies → progressive-map → ...`

Pages affected by prev/next changes:
- `ppr.mdx`: next changes from `04-synthesis/progressive-map` to `03-graph-rag/competency-questions`
- `progressive-map.mdx`: prev changes from `03-graph-rag/ppr` to `03-graph-rag/foundational-ontologies`

New pages navigation:
- `competency-questions.mdx`: prev=`03-graph-rag/ppr`, next=`03-graph-rag/rag-ontology-map`
- `rag-ontology-map.mdx`: prev=`03-graph-rag/competency-questions`, next=`03-graph-rag/foundational-ontologies`
- `foundational-ontologies.mdx`: prev=`03-graph-rag/rag-ontology-map`, next=`04-synthesis/progressive-map`

## Content Schema Update

The existing `content/config.ts` schema requires no changes. New pages use existing fields:
- section: `"graph-rag"`
- order: 6, 7, 8 (after existing 5 pages in graph-rag section)
- prerequisites: point to existing ontology page
- relatedPages: cross-reference graphrag, ontology, lightrag, hipporag pages
- tags: ontology, competency-questions, dolce, bfo, sumo, ontoclean

## Test Schema Update

The existing `tests/content/schema.test.ts` validates against a `REQUIRED_PAGES` list. This must be updated to include the 3 new page slugs. The test count increases from 16 to 19 required pages.

## Complexity Tracking

No constitution violations. No complexity justifications needed.

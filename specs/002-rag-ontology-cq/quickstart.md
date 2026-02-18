# Quickstart: RAG Ontology with Competency Questions

**Date**: 2026-02-18
**Feature**: 002-rag-ontology-cq

## Prerequisites

- Node.js 18+
- npm
- Feature 001 (rag-deep-dive) must be complete with all 16 pages building

## Verification Steps

### 1. Run existing tests (should all pass before changes)

```bash
npm run test
```

Expected: 5 test files, 15 tests pass.

### 2. After adding new pages, run tests again

```bash
npm run test
```

Expected: 5 test files, 15+ tests pass (schema test now validates 19 pages).

### 3. Build the site

```bash
npm run build
```

Expected: 20 pages built (1 index + 19 content pages).

### 4. Preview and verify navigation

```bash
npm run preview
```

Then open http://localhost:4321/03-graph-rag/ppr and:
1. Verify "Next" link goes to "Competency Questions for RAG"
2. Navigate through all 3 new pages via Next links
3. Verify last new page links to "Progressive Map"
4. Check sidebar shows all 8 graph-rag section pages

### 5. Verify Mermaid diagrams render

Open http://localhost:4321/03-graph-rag/rag-ontology-map and verify:
- Class diagram renders as SVG (not raw text)
- Diagram shows endurant/perdurant categorization
- Diagram is scrollable on narrow viewports

### 6. Verify cross-references

Open http://localhost:4321/03-graph-rag/competency-questions and verify:
- CrossReference links to existing ontology page work
- Related Topics section shows linked pages
- Prerequisite bar shows "Ontology: Endurants & Perdurants"

# Data Model: RAG Ontology with Competency Questions

**Date**: 2026-02-18
**Feature**: 002-rag-ontology-cq

## Overview

No schema changes to `src/content/config.ts`. The 3 new pages use the existing content schema. This document defines the frontmatter for each new page.

## New Pages

### Page: competency-questions.mdx

| Field | Value |
|-------|-------|
| title | "Competency Questions for RAG" |
| description | "How to systematically design a RAG ontology using the five types of Competency Questions" |
| section | "graph-rag" |
| order | 6 |
| prerequisites | ["03-graph-rag/ontology"] |
| relatedPages | ["03-graph-rag/graphrag", "03-graph-rag/rag-ontology-map"] |
| prev | "03-graph-rag/ppr" |
| next | "03-graph-rag/rag-ontology-map" |
| tags | ["ontology", "competency-questions", "methodology", "ontoclean"] |

### Page: rag-ontology-map.mdx

| Field | Value |
|-------|-------|
| title | "RAG Ontology Map" |
| description | "A visual ontology of RAG concepts mapped to DOLCE foundational categories using Mermaid diagrams" |
| section | "graph-rag" |
| order | 7 |
| prerequisites | ["03-graph-rag/competency-questions"] |
| relatedPages | ["03-graph-rag/ontology", "03-graph-rag/graphrag", "03-graph-rag/foundational-ontologies"] |
| prev | "03-graph-rag/competency-questions" |
| next | "03-graph-rag/foundational-ontologies" |
| tags | ["ontology", "dolce", "endurant", "perdurant", "mermaid"] |

### Page: foundational-ontologies.mdx

| Field | Value |
|-------|-------|
| title | "Foundational Ontologies for RAG" |
| description | "Comparing DOLCE, BFO, and SUMO as foundations for modeling RAG systems ontologically" |
| section | "graph-rag" |
| order | 8 |
| prerequisites | ["03-graph-rag/rag-ontology-map"] |
| relatedPages | ["03-graph-rag/ontology", "03-graph-rag/competency-questions"] |
| prev | "03-graph-rag/rag-ontology-map" |
| next | "04-synthesis/progressive-map" |
| tags | ["ontology", "dolce", "bfo", "sumo", "foundational"] |

## Navigation Chain Updates

| Page | Field | Old Value | New Value |
|------|-------|-----------|-----------|
| ppr.mdx | next | "04-synthesis/progressive-map" | "03-graph-rag/competency-questions" |
| progressive-map.mdx | prev | "03-graph-rag/ppr" | "03-graph-rag/foundational-ontologies" |

## Test Updates

The `REQUIRED_PAGES` array in `tests/content/schema.test.ts` must add:
- `03-graph-rag/competency-questions`
- `03-graph-rag/rag-ontology-map`
- `03-graph-rag/foundational-ontologies`

Total required pages: 19 (was 16).

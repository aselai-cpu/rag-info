# Data Model: RAG Deep Dive Exploratory Website

**Date**: 2026-02-17
**Feature**: 001-rag-deep-dive

## Overview

This is a static content site with no database. The "data model" is the
content schema enforced by Astro Content Collections via Zod validation.
All data lives in MDX frontmatter and is type-checked at build time.

## Content Page Schema

Each MDX page in the content collection has this frontmatter structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Page title displayed in heading and navigation |
| description | string | Yes | Short summary for meta tags and previews |
| section | enum | Yes | One of: "foundation", "retrieval-strategies", "graph-rag", "synthesis" |
| order | number | Yes | Position within section for linear navigation |
| prerequisites | string[] | No | Slugs of pages that should be read first |
| relatedPages | string[] | No | Slugs of conceptually related pages |
| prev | string | No | Slug of previous page in linear path |
| next | string | No | Slug of next page in linear path |
| tags | string[] | No | Concepts covered (for cross-referencing) |

### Section Enum Values

| Value | Display Name | Pages |
|-------|-------------|-------|
| foundation | Foundation | why-rag, naive-rag, problem-tree |
| retrieval-strategies | Retrieval Strategies | symmetry-problem, hyde, hype, asymmetric-embeddings, hybrid-rag |
| graph-rag | Graph-Based RAG | graphrag, ontology, lightrag, hipporag, ppr |
| synthesis | Synthesis | progressive-map, indexing-comparison, decision-guide |

## Entity: RAG Approach

Represented as structured data within MDX content (not a separate
collection, to keep things simple per YAGNI).

| Attribute | Description |
|-----------|-------------|
| Name | Display name (e.g., "Naive RAG", "GraphRAG") |
| Problem Solved | Which limitation(s) it addresses |
| Mechanism | How it works (brief) |
| Trade-offs | Strengths and weaknesses |
| Indexing Strategy | What gets indexed and how |
| Best For | Query types it handles well |
| Related Approaches | Links to other RAG approaches |

## Entity: Challenge

| Attribute | Description |
|-----------|-------------|
| Name | Display name (e.g., "Symmetry Mismatch") |
| Description | What the problem is |
| Affected Approaches | Which RAG variants suffer from this |
| Solutions | Strategies that address it |

## Entity: Ontological Construct

| Attribute | Description |
|-----------|-------------|
| Category | Endurant or Perdurant |
| Name | Specific type (Entity, Property, Process, Event, State) |
| Definition | What it represents |
| Examples | Concrete examples from RAG context |
| KG Implications | How it affects knowledge graph design |

## Navigation Graph

The linear path defines reading order:

```
why-rag → naive-rag → problem-tree →
symmetry-problem → hyde → hype → asymmetric-embeddings →
hybrid-rag → graphrag → ontology → lightrag →
hipporag → ppr → progressive-map →
indexing-comparison → decision-guide
```

Cross-references create a non-linear navigation graph. Key
cross-reference relationships:

- "embeddings" concept: naive-rag ↔ hyde ↔ hype ↔ asymmetric-embeddings
- "knowledge graph" concept: graphrag ↔ ontology ↔ lightrag ↔ hipporag
- "retrieval" concept: naive-rag ↔ hybrid-rag ↔ graphrag ↔ hipporag
- "indexing" concept: naive-rag ↔ indexing-comparison (links all approaches)

## Validation Rules

1. Every page MUST have title, description, section, and order
2. Every slug in prerequisites MUST exist as a content page
3. Every slug in relatedPages MUST exist as a content page
4. The prerequisite graph MUST be acyclic (no circular dependencies)
5. Linear path (prev/next) MUST form a complete chain covering all pages
6. Order numbers MUST be unique within each section

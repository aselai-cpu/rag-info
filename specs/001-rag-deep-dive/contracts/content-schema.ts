/**
 * Content Collection Schema Contract
 *
 * This defines the expected schema for Astro Content Collections.
 * The actual implementation in src/content/config.ts MUST match
 * this contract exactly.
 *
 * This file serves as the design contract — it is NOT imported
 * at runtime. The implementation duplicates the schema in the
 * Astro config to avoid coupling the spec to the source.
 */

import { z } from "zod";

export const SectionEnum = z.enum([
  "foundation",
  "retrieval-strategies",
  "graph-rag",
  "synthesis",
]);

export const PageSchema = z.object({
  /** Page title displayed in heading and navigation */
  title: z.string().min(1),

  /** Short summary for meta tags and previews */
  description: z.string().min(10).max(200),

  /** Learning section this page belongs to */
  section: SectionEnum,

  /** Position within section for linear navigation (1-based) */
  order: z.number().int().positive(),

  /** Slugs of pages that should be read first */
  prerequisites: z.array(z.string()).optional().default([]),

  /** Slugs of conceptually related pages */
  relatedPages: z.array(z.string()).optional().default([]),

  /** Slug of previous page in linear path */
  prev: z.string().optional(),

  /** Slug of next page in linear path */
  next: z.string().optional(),

  /** Concepts covered (for cross-referencing) */
  tags: z.array(z.string()).optional().default([]),
});

export type Page = z.infer<typeof PageSchema>;
export type Section = z.infer<typeof SectionEnum>;

/**
 * Content page inventory — every MDX file that MUST exist.
 *
 * Format: { slug: { section, order, title } }
 */
export const REQUIRED_PAGES = {
  "01-foundation/why-rag": {
    section: "foundation" as const,
    order: 1,
    title: "Why RAG?",
  },
  "01-foundation/naive-rag": {
    section: "foundation" as const,
    order: 2,
    title: "Naive RAG",
  },
  "01-foundation/problem-tree": {
    section: "foundation" as const,
    order: 3,
    title: "The Problem Tree",
  },
  "02-retrieval-strategies/symmetry-problem": {
    section: "retrieval-strategies" as const,
    order: 1,
    title: "The Symmetry Problem",
  },
  "02-retrieval-strategies/hyde": {
    section: "retrieval-strategies" as const,
    order: 2,
    title: "HyDE: Hypothetical Document Embeddings",
  },
  "02-retrieval-strategies/hype": {
    section: "retrieval-strategies" as const,
    order: 3,
    title: "HyPE: Hypothetical Prompt Embeddings",
  },
  "02-retrieval-strategies/asymmetric-embeddings": {
    section: "retrieval-strategies" as const,
    order: 4,
    title: "Asymmetric Embeddings",
  },
  "02-retrieval-strategies/hybrid-rag": {
    section: "retrieval-strategies" as const,
    order: 5,
    title: "Hybrid RAG",
  },
  "03-graph-rag/graphrag": {
    section: "graph-rag" as const,
    order: 1,
    title: "GraphRAG",
  },
  "03-graph-rag/ontology": {
    section: "graph-rag" as const,
    order: 2,
    title: "Ontology: Endurants & Perdurants",
  },
  "03-graph-rag/lightrag": {
    section: "graph-rag" as const,
    order: 3,
    title: "LightRAG",
  },
  "03-graph-rag/hipporag": {
    section: "graph-rag" as const,
    order: 4,
    title: "HippoRAG",
  },
  "03-graph-rag/ppr": {
    section: "graph-rag" as const,
    order: 5,
    title: "Personalized PageRank",
  },
  "04-synthesis/progressive-map": {
    section: "synthesis" as const,
    order: 1,
    title: "Progressive Build-Up Map",
  },
  "04-synthesis/indexing-comparison": {
    section: "synthesis" as const,
    order: 2,
    title: "Indexing Strategy Comparison",
  },
  "04-synthesis/decision-guide": {
    section: "synthesis" as const,
    order: 3,
    title: "Decision Guide",
  },
} as const;

import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node:path';

const CONTENT_DIR = join(process.cwd(), 'src/content/pages');

const REQUIRED_PAGES: Record<string, { section: string; order: number; title: string }> = {
  '01-foundation/why-rag': { section: 'foundation', order: 1, title: 'Why RAG?' },
  '01-foundation/naive-rag': { section: 'foundation', order: 2, title: 'Naive RAG' },
  '01-foundation/problem-tree': { section: 'foundation', order: 3, title: 'The Problem Tree' },
  '02-retrieval-strategies/symmetry-problem': { section: 'retrieval-strategies', order: 1, title: 'The Symmetry Problem' },
  '02-retrieval-strategies/hyde': { section: 'retrieval-strategies', order: 2, title: 'HyDE: Hypothetical Document Embeddings' },
  '02-retrieval-strategies/hype': { section: 'retrieval-strategies', order: 3, title: 'HyPE: Hypothetical Prompt Embeddings' },
  '02-retrieval-strategies/asymmetric-embeddings': { section: 'retrieval-strategies', order: 4, title: 'Asymmetric Embeddings' },
  '02-retrieval-strategies/hybrid-rag': { section: 'retrieval-strategies', order: 5, title: 'Hybrid RAG' },
  '03-graph-rag/graphrag': { section: 'graph-rag', order: 1, title: 'GraphRAG' },
  '03-graph-rag/ontology': { section: 'graph-rag', order: 2, title: 'Ontology: Endurants & Perdurants' },
  '03-graph-rag/lightrag': { section: 'graph-rag', order: 3, title: 'LightRAG' },
  '03-graph-rag/hipporag': { section: 'graph-rag', order: 4, title: 'HippoRAG' },
  '03-graph-rag/ppr': { section: 'graph-rag', order: 5, title: 'Personalized PageRank' },
  '03-graph-rag/competency-questions': { section: 'graph-rag', order: 6, title: 'Competency Questions for RAG' },
  '03-graph-rag/rag-ontology-map': { section: 'graph-rag', order: 7, title: 'RAG Ontology Map' },
  '03-graph-rag/foundational-ontologies': { section: 'graph-rag', order: 8, title: 'Foundational Ontologies for RAG' },
  '04-synthesis/progressive-map': { section: 'synthesis', order: 1, title: 'Progressive Build-Up Map' },
  '04-synthesis/indexing-comparison': { section: 'synthesis', order: 2, title: 'Indexing Strategy Comparison' },
  '04-synthesis/decision-guide': { section: 'synthesis', order: 3, title: 'Decision Guide' },
};

const VALID_SECTIONS = ['foundation', 'retrieval-strategies', 'graph-rag', 'synthesis'];

function extractFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result: Record<string, unknown> = {};
  for (const line of yaml.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();
    // Handle arrays
    if (typeof value === 'string' && value.startsWith('[')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    }
    // Handle numbers
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }
    // Handle quoted strings
    if (typeof value === 'string') {
      value = value.replace(/^["']|["']$/g, '');
    }
    result[key] = value;
  }
  return result;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readPage(slug: string): Promise<{ exists: boolean; frontmatter: Record<string, unknown> }> {
  const filePath = join(CONTENT_DIR, `${slug}.mdx`);
  if (!(await fileExists(filePath))) {
    return { exists: false, frontmatter: {} };
  }
  const content = await fs.readFile(filePath, 'utf-8');
  return { exists: true, frontmatter: extractFrontmatter(content) };
}

describe('Content Schema Validation', () => {
  it('all required pages exist', async () => {
    const missing: string[] = [];
    for (const slug of Object.keys(REQUIRED_PAGES)) {
      const { exists } = await readPage(slug);
      if (!exists) missing.push(slug);
    }
    expect(missing, `Missing pages: ${missing.join(', ')}`).toEqual([]);
  });

  it('all pages have required frontmatter fields', async () => {
    const errors: string[] = [];
    for (const slug of Object.keys(REQUIRED_PAGES)) {
      const { exists, frontmatter } = await readPage(slug);
      if (!exists) continue;
      if (!frontmatter.title) errors.push(`${slug}: missing title`);
      if (!frontmatter.description) errors.push(`${slug}: missing description`);
      if (!frontmatter.section) errors.push(`${slug}: missing section`);
      if (frontmatter.order === undefined) errors.push(`${slug}: missing order`);
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('all pages have valid section values', async () => {
    const errors: string[] = [];
    for (const slug of Object.keys(REQUIRED_PAGES)) {
      const { exists, frontmatter } = await readPage(slug);
      if (!exists) continue;
      if (frontmatter.section && !VALID_SECTIONS.includes(frontmatter.section as string)) {
        errors.push(`${slug}: invalid section "${frontmatter.section}"`);
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('order numbers are unique within each section', async () => {
    const sectionOrders: Record<string, Array<{ slug: string; order: number }>> = {};
    for (const slug of Object.keys(REQUIRED_PAGES)) {
      const { exists, frontmatter } = await readPage(slug);
      if (!exists) continue;
      const section = frontmatter.section as string;
      if (!section) continue;
      if (!sectionOrders[section]) sectionOrders[section] = [];
      sectionOrders[section].push({ slug, order: frontmatter.order as number });
    }
    const errors: string[] = [];
    for (const [section, pages] of Object.entries(sectionOrders)) {
      const orders = pages.map(p => p.order);
      const duplicates = orders.filter((o, i) => orders.indexOf(o) !== i);
      if (duplicates.length > 0) {
        errors.push(`Section "${section}" has duplicate orders: ${duplicates.join(', ')}`);
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });
});

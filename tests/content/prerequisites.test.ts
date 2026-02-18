import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = join(process.cwd(), 'src/content/pages');

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
    if (typeof value === 'string' && value.startsWith('[')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    }
    if (typeof value === 'string') {
      value = value.replace(/^["']|["']$/g, '');
    }
    result[key] = value;
  }
  return result;
}

async function getAllMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getAllMdxFiles(fullPath));
      } else if (entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist yet
  }
  return files;
}

function filePathToSlug(filePath: string): string {
  return filePath.replace(CONTENT_DIR + '/', '').replace('.mdx', '');
}

describe('Prerequisite Acyclicity', () => {
  it('prerequisite graph has no circular dependencies', async () => {
    const allFiles = await getAllMdxFiles(CONTENT_DIR);
    const graph: Record<string, string[]> = {};

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const fm = extractFrontmatter(content);
      const slug = filePathToSlug(file);
      const prerequisites = fm.prerequisites;
      graph[slug] = Array.isArray(prerequisites) ? prerequisites : [];
    }

    // DFS cycle detection
    const visited = new Set<string>();
    const inStack = new Set<string>();
    const cycles: string[] = [];

    function dfs(node: string, path: string[]): void {
      if (inStack.has(node)) {
        const cycleStart = path.indexOf(node);
        cycles.push(path.slice(cycleStart).concat(node).join(' → '));
        return;
      }
      if (visited.has(node)) return;

      visited.add(node);
      inStack.add(node);

      for (const dep of (graph[node] || [])) {
        dfs(dep, [...path, node]);
      }

      inStack.delete(node);
    }

    for (const node of Object.keys(graph)) {
      dfs(node, []);
    }

    expect(cycles, `Circular dependencies found:\n${cycles.join('\n')}`).toEqual([]);
  });

  it('linear path (prev/next) forms a complete chain', async () => {
    const allFiles = await getAllMdxFiles(CONTENT_DIR);
    if (allFiles.length === 0) {
      // No pages yet, skip
      expect(allFiles.length).toBe(0);
      return;
    }

    const pages: Record<string, { prev?: string; next?: string }> = {};
    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const fm = extractFrontmatter(content);
      const slug = filePathToSlug(file);
      pages[slug] = {
        prev: fm.prev as string | undefined,
        next: fm.next as string | undefined,
      };
    }

    // Find the first page (no prev)
    const starts = Object.entries(pages).filter(([_, p]) => !p.prev);
    expect(starts.length, 'Expected exactly one page with no prev link').toBe(1);

    if (starts.length !== 1) return;

    // Walk the chain
    const chain: string[] = [];
    let current: string | undefined = starts[0][0];
    const seen = new Set<string>();

    while (current) {
      if (seen.has(current)) {
        throw new Error(`Cycle in prev/next chain at: ${current}`);
      }
      seen.add(current);
      chain.push(current);
      current = pages[current]?.next;
    }

    expect(chain.length, `Chain covers ${chain.length} of ${allFiles.length} pages`).toBe(allFiles.length);
  });
});

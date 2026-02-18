import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = join(process.cwd(), 'src/content/pages');

const EXPECTED_SECTIONS = [
  { dir: '01-foundation', section: 'foundation', minPages: 3 },
  { dir: '02-retrieval-strategies', section: 'retrieval-strategies', minPages: 5 },
  { dir: '03-graph-rag', section: 'graph-rag', minPages: 8 },
  { dir: '04-synthesis', section: 'synthesis', minPages: 3 },
];

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
    if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }
    if (typeof value === 'string') {
      value = value.replace(/^["']|["']$/g, '');
    }
    result[key] = value;
  }
  return result;
}

describe('Navigation Structure', () => {
  it('all 4 section directories exist', async () => {
    const missing: string[] = [];
    for (const { dir } of EXPECTED_SECTIONS) {
      try {
        await fs.access(join(CONTENT_DIR, dir));
      } catch {
        missing.push(dir);
      }
    }
    expect(missing, `Missing section directories: ${missing.join(', ')}`).toEqual([]);
  });

  it('each section has the expected minimum number of pages', async () => {
    const errors: string[] = [];
    for (const { dir, section, minPages } of EXPECTED_SECTIONS) {
      const sectionDir = join(CONTENT_DIR, dir);
      try {
        const files = await fs.readdir(sectionDir);
        const mdxFiles = files.filter(f => f.endsWith('.mdx'));
        if (mdxFiles.length < minPages) {
          errors.push(`Section "${section}" (${dir}): has ${mdxFiles.length} pages, expected at least ${minPages}`);
        }
      } catch {
        errors.push(`Section "${section}" (${dir}): directory does not exist`);
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('pages within each section are correctly ordered', async () => {
    const errors: string[] = [];
    for (const { dir, section } of EXPECTED_SECTIONS) {
      const sectionDir = join(CONTENT_DIR, dir);
      try {
        const files = await fs.readdir(sectionDir);
        const mdxFiles = files.filter(f => f.endsWith('.mdx'));
        const orders: number[] = [];
        for (const file of mdxFiles) {
          const content = await fs.readFile(join(sectionDir, file), 'utf-8');
          const fm = extractFrontmatter(content);
          if (typeof fm.order === 'number') {
            orders.push(fm.order);
          } else {
            errors.push(`${dir}/${file}: missing or non-numeric order`);
          }
        }
        // Check orders are sequential starting from 1
        const sorted = [...orders].sort((a, b) => a - b);
        for (let i = 0; i < sorted.length; i++) {
          if (sorted[i] !== i + 1) {
            errors.push(`Section "${section}": expected order ${i + 1} but got ${sorted[i]}`);
          }
        }
      } catch {
        // Directory doesn't exist - already covered by previous test
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });
});

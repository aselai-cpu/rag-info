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
  return filePath
    .replace(CONTENT_DIR + '/', '')
    .replace('.mdx', '');
}

describe('Cross-Reference Validation', () => {
  it('all prerequisite slugs resolve to existing pages', async () => {
    const allFiles = await getAllMdxFiles(CONTENT_DIR);
    const allSlugs = new Set(allFiles.map(filePathToSlug));
    const errors: string[] = [];

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const fm = extractFrontmatter(content);
      const slug = filePathToSlug(file);
      const prerequisites = fm.prerequisites;
      if (Array.isArray(prerequisites)) {
        for (const prereq of prerequisites) {
          if (!allSlugs.has(prereq)) {
            errors.push(`${slug}: prerequisite "${prereq}" does not exist`);
          }
        }
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('all relatedPages slugs resolve to existing pages', async () => {
    const allFiles = await getAllMdxFiles(CONTENT_DIR);
    const allSlugs = new Set(allFiles.map(filePathToSlug));
    const errors: string[] = [];

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const fm = extractFrontmatter(content);
      const slug = filePathToSlug(file);
      const relatedPages = fm.relatedPages;
      if (Array.isArray(relatedPages)) {
        for (const related of relatedPages) {
          if (!allSlugs.has(related)) {
            errors.push(`${slug}: relatedPage "${related}" does not exist`);
          }
        }
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('prev/next slugs resolve to existing pages', async () => {
    const allFiles = await getAllMdxFiles(CONTENT_DIR);
    const allSlugs = new Set(allFiles.map(filePathToSlug));
    const errors: string[] = [];

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const fm = extractFrontmatter(content);
      const slug = filePathToSlug(file);
      if (fm.prev && typeof fm.prev === 'string' && !allSlugs.has(fm.prev)) {
        errors.push(`${slug}: prev "${fm.prev}" does not exist`);
      }
      if (fm.next && typeof fm.next === 'string' && !allSlugs.has(fm.next)) {
        errors.push(`${slug}: next "${fm.next}" does not exist`);
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });
});

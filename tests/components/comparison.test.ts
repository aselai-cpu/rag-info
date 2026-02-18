import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

describe('ComparisonTable Component', () => {
  it('ComparisonTable.astro exists', async () => {
    const path = join(process.cwd(), 'src/components/ComparisonTable.astro');
    const stat = await fs.stat(path);
    expect(stat.isFile()).toBe(true);
  });

  it('ComparisonTable accepts columns and rows props', async () => {
    const path = join(process.cwd(), 'src/components/ComparisonTable.astro');
    const content = await fs.readFile(path, 'utf-8');
    expect(content).toContain('columns');
    expect(content).toContain('rows');
  });

  it('ComparisonTable supports filterColumn prop', async () => {
    const path = join(process.cwd(), 'src/components/ComparisonTable.astro');
    const content = await fs.readFile(path, 'utf-8');
    expect(content).toContain('filterColumn');
  });
});

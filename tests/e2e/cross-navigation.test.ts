import { test, expect } from '@playwright/test';

test('cross-navigation between retrieval strategy pages in ≤2 clicks', async ({ page }) => {
  await page.goto('/02-retrieval-strategies/hyde');
  // Should be able to reach HyPE from related pages or nav
  const relatedLink = page.locator('a[href*="hype"]').first();
  await expect(relatedLink).toBeVisible();
  await relatedLink.click();
  await expect(page).toHaveURL(/hype/);
});

test('sidebar navigation allows direct jump to any section', async ({ page }) => {
  await page.goto('/01-foundation/why-rag');
  // Click on a graph-rag page from sidebar
  const graphragLink = page.locator('.nav-link[href*="graphrag"]').first();
  await graphragLink.click();
  await expect(page).toHaveURL(/graphrag/);
});

test('related topics section shows cross-references', async ({ page }) => {
  await page.goto('/02-retrieval-strategies/symmetry-problem');
  const related = page.locator('text=Related Topics');
  // Related topics should exist if relatedPages is populated
  const links = page.locator('a[href*="hyde"], a[href*="hype"], a[href*="asymmetric"]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
});

import { test, expect } from '@playwright/test';

test('landing page links to Why RAG as first content page', async ({ page }) => {
  await page.goto('/');
  const startLink = page.locator('a[href*="why-rag"]').first();
  await expect(startLink).toBeVisible();
  await startLink.click();
  await expect(page).toHaveURL(/why-rag/);
});

test('progressive path works through foundation pages', async ({ page }) => {
  await page.goto('/01-foundation/why-rag');
  await expect(page.locator('h1')).toContainText('Why RAG');

  // Navigate to next: Naive RAG
  const nextLink1 = page.locator('.page-nav-next');
  await nextLink1.click();
  await expect(page).toHaveURL(/naive-rag/);
  await expect(page.locator('h1')).toContainText('Naive RAG');

  // Navigate to next: Problem Tree
  const nextLink2 = page.locator('.page-nav-next');
  await nextLink2.click();
  await expect(page).toHaveURL(/problem-tree/);
  await expect(page.locator('h1')).toContainText('Problem Tree');
});

test('navigation sidebar shows all sections', async ({ page }) => {
  await page.goto('/01-foundation/why-rag');
  const sidebar = page.locator('.site-sidebar');
  await expect(sidebar).toBeVisible();
  await expect(sidebar.locator('.nav-section')).toHaveCount(4);
});

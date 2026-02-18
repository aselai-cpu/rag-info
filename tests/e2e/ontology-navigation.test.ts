import { test, expect } from '@playwright/test';

test('navigation from PPR through 3 new ontology pages to Progressive Map', async ({ page }) => {
  await page.goto('/03-graph-rag/ppr');
  // PPR next should go to Competency Questions
  const nextLink1 = page.locator('.page-nav-next');
  await nextLink1.click();
  await expect(page).toHaveURL(/competency-questions/);
  await expect(page.locator('h1')).toContainText('Competency Questions');

  // CQ next should go to RAG Ontology Map
  const nextLink2 = page.locator('.page-nav-next');
  await nextLink2.click();
  await expect(page).toHaveURL(/rag-ontology-map/);
  await expect(page.locator('h1')).toContainText('RAG Ontology Map');

  // Ontology Map next should go to Foundational Ontologies
  const nextLink3 = page.locator('.page-nav-next');
  await nextLink3.click();
  await expect(page).toHaveURL(/foundational-ontologies/);
  await expect(page.locator('h1')).toContainText('Foundational Ontologies');

  // Foundational Ontologies next should go to Progressive Map
  const nextLink4 = page.locator('.page-nav-next');
  await nextLink4.click();
  await expect(page).toHaveURL(/progressive-map/);
});

test('sidebar shows 8 pages in graph-rag section', async ({ page }) => {
  await page.goto('/03-graph-rag/competency-questions');
  const graphRagSection = page.locator('details.nav-section', { has: page.locator('text=Graph-Based RAG') });
  const links = graphRagSection.locator('.nav-link');
  await expect(links).toHaveCount(8);
});

# Tasks: RAG Deep Dive Exploratory Website

**Input**: Design documents from `/specs/001-rag-deep-dive/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Included per constitution (Test-First principle is NON-NEGOTIABLE). Tests are written FIRST and MUST FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Astro configuration, and TypeScript setup

- [x] T001 Initialize Astro project with TypeScript strict mode in package.json, tsconfig.json, and astro.config.mjs
- [x] T002 Install dependencies: @astrojs/mdx, mermaid, rehype-slug, rehype-autolink-headings in package.json
- [x] T003 [P] Configure Vitest with Astro support in vitest.config.ts
- [x] T004 [P] Configure Playwright for e2e testing in playwright.config.ts
- [x] T005 [P] Create global styles with typography, callout blocks, and responsive table styles in src/styles/global.css
- [x] T006 Configure Mermaid build-time rendering integration in astro.config.mjs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Content schema, core layout, and shared components that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundation (write FIRST, must FAIL)

- [x] T007 [P] Write content schema validation test that verifies all pages have required frontmatter fields (title, description, section, order) in tests/content/schema.test.ts
- [x] T008 [P] Write cross-reference validation test that verifies all prerequisite and relatedPages slugs resolve to existing pages in tests/content/crossrefs.test.ts
- [x] T009 [P] Write prerequisite acyclicity test that verifies the prerequisite graph has no circular dependencies in tests/content/prerequisites.test.ts
- [x] T010 [P] Write navigation structure test that verifies all 4 sections appear and pages are correctly ordered in tests/components/navigation.test.ts

### Implementation for Foundation

- [x] T011 Implement Astro Content Collections schema with Zod validation matching contracts/content-schema.ts in src/content/config.ts
- [x] T012 [P] Create Layout.astro base component with HTML shell, meta tags, and global.css import in src/components/Layout.astro
- [x] T013 [P] Create DiagramBlock.astro component with figure/figcaption wrapper and alt text in src/components/DiagramBlock.astro
- [x] T014 [P] Create CrossReference.astro component that resolves page slugs to titles and renders links in src/components/CrossReference.astro
- [x] T015 [P] Create PrerequisiteBar.astro component that renders prerequisite links (or nothing if empty) in src/components/PrerequisiteBar.astro
- [x] T016 [P] Create PathNotTaken.astro callout component with distinct visual styling in src/components/PathNotTaken.astro
- [x] T017 [P] Create ProgressTracker.astro component showing current position in learning path in src/components/ProgressTracker.astro
- [x] T018 Create Navigation.astro sidebar component with collapsible sections and current page highlighting in src/components/Navigation.astro
- [x] T019 Create PageLayout.astro that composes Layout + Navigation + PrerequisiteBar + ProgressTracker + content slot in src/layouts/PageLayout.astro
- [x] T020 Create dynamic content route that renders MDX pages through PageLayout in src/pages/[...slug].astro

**Checkpoint**: Foundation ready — schema validates, layout renders, navigation works. Run `npm run test` to verify T007-T010 pass.

---

## Phase 3: User Story 1 — First-Principles RAG Foundation (Priority: P1) MVP

**Goal**: Learner understands why RAG exists, how Naive RAG works, and its specific failure modes via a problem tree

**Independent Test**: Navigate foundation section; learner can articulate (1) why RAG exists, (2) how naive RAG works, (3) its failure modes

### Tests for User Story 1 (write FIRST, must FAIL)

- [x] T021 [P] [US1] Write e2e test that verifies landing page links to "Why RAG?" as the first content page and the progressive path works through all 3 foundation pages in tests/e2e/progressive-path.test.ts
- [x] T022 [P] [US1] Write comparison table rendering test that verifies columns, rows, and filter behavior in tests/components/comparison.test.ts

### Implementation for User Story 1

- [x] T023 [US1] Create landing page with site introduction, "Start Learning" CTA linking to why-rag, and overview of the learning path in src/pages/index.astro
- [x] T024 [P] [US1] Write "Why RAG?" page covering knowledge cutoff, hallucination, grounding with first-principles explanation and Mermaid diagram of LLM limitations in src/content/pages/01-foundation/why-rag.mdx
- [x] T025 [P] [US1] Write "Naive RAG" page covering chunk→embed→retrieve→generate pipeline with worked example, Mermaid flowchart, and named limitations (symmetry mismatch, chunking dilemma, no global context, multi-hop failure) in src/content/pages/01-foundation/naive-rag.mdx
- [x] T026 [US1] Write "Problem Tree" page with Mermaid diagram mapping each limitation to the RAG variant that solves it, serving as navigation map for the rest of the site in src/content/pages/01-foundation/problem-tree.mdx
- [x] T027 [US1] Create ComparisonTable.astro component with filterable rows using CSS-only show/hide in src/components/ComparisonTable.astro
- [x] T028 [US1] Add prev/next links, prerequisites, relatedPages, and tags to all 3 foundation MDX files to establish the linear path and cross-references
- [x] T029 [US1] Verify foundation section builds and all tests from T021-T022 pass by running `npm run test && npm run build`

**Checkpoint**: US1 complete — site has landing page + 3 foundation pages with working navigation. Run `npm run test:e2e` to verify.

---

## Phase 4: User Story 2 — Retrieval Challenges & Strategies (Priority: P2)

**Goal**: Learner understands the symmetry problem, HyDE/HyPE/asymmetric embeddings as alternative solutions, and Hybrid RAG combining sparse + dense retrieval

**Independent Test**: Navigate retrieval strategies section; learner can explain (1) the symmetry problem, (2) how each strategy solves it differently, (3) why hybrid outperforms sparse or dense alone

### Tests for User Story 2 (write FIRST, must FAIL)

- [x] T030 [P] [US2] Write e2e test that verifies non-linear cross-navigation between retrieval strategy pages (any topic to related topic in ≤2 clicks) in tests/e2e/cross-navigation.test.ts

### Implementation for User Story 2

- [x] T031 [P] [US2] Write "Symmetry Problem" page explaining query vs document embedding misalignment with Mermaid vector space diagram and concrete failing example in src/content/pages/02-retrieval-strategies/symmetry-problem.mdx
- [x] T032 [P] [US2] Write "HyDE" page covering hypothetical document generation at query time with pipeline diagram, worked example, PathNotTaken callout for fine-tuning approach, and trade-off analysis in src/content/pages/02-retrieval-strategies/hyde.mdx
- [x] T033 [P] [US2] Write "HyPE" page covering hypothetical question generation at index time with side-by-side comparison to HyDE (query-time vs index-time), pipeline diagram, and performance metrics in src/content/pages/02-retrieval-strategies/hype.mdx
- [x] T034 [P] [US2] Write "Asymmetric Embeddings" page covering dual encoders, instruction-tuned prefixes, and PathNotTaken callout for symmetric-only approaches in src/content/pages/02-retrieval-strategies/asymmetric-embeddings.mdx
- [x] T035 [US2] Write "Hybrid RAG" page covering BM25 + vector search, Reciprocal Rank Fusion diagram, worked example where one method fails but combination succeeds, and PathNotTaken for single-retrieval approaches in src/content/pages/02-retrieval-strategies/hybrid-rag.mdx
- [x] T036 [US2] Add prev/next links, prerequisites (all require naive-rag), relatedPages, and tags to all 5 retrieval strategy MDX files
- [x] T037 [US2] Verify retrieval strategies section builds and T030 passes by running `npm run test && npm run build`

**Checkpoint**: US2 complete — 5 retrieval strategy pages with cross-references and PathNotTaken callouts. Run `npm run test:e2e` to verify.

---

## Phase 5: User Story 3 — Graph-Based RAG Deep Dive (Priority: P3)

**Goal**: Learner understands GraphRAG (with ontological analysis of endurants/perdurants), LightRAG simplification, HippoRAG with PPR, and the progression between them

**Independent Test**: Navigate graph RAG sections; learner can explain (1) GraphRAG KG construction + querying, (2) endurants vs perdurants, (3) PPR for multi-hop retrieval

### Tests for User Story 3 (write FIRST, must FAIL)

- [x] T038 [P] [US3] Write content validation test that verifies all 5 graph-rag section pages exist with correct frontmatter and prerequisite chains point to foundation pages in tests/content/schema.test.ts (extend existing)

### Implementation for User Story 3

- [x] T039 [P] [US3] Write "GraphRAG" page covering entity extraction, relationship descriptions, Hierarchical Leiden community detection, community summarization, global/local/DRIFT search modes with Mermaid diagrams for KG construction and query flows in src/content/pages/03-graph-rag/graphrag.mdx
- [x] T040 [P] [US3] Write "Ontology: Endurants & Perdurants" page defining endurants (entities, properties) and perdurants (processes, events, states) with concrete RAG examples, highlighted callout on why traditional KG extraction misses perdurants, and PathNotTaken for entity-only approaches in src/content/pages/03-graph-rag/ontology.mdx
- [x] T041 [P] [US3] Write "LightRAG" page covering elimination of community detection, dual-level retrieval (low-level entities + high-level keywords), keyword extraction from queries, cost comparison with GraphRAG, and PathNotTaken for full community approach in src/content/pages/03-graph-rag/lightrag.mdx
- [x] T042 [P] [US3] Write "HippoRAG" page covering brain-to-architecture analogy (neocortex→LLM, PHR→retrieval encoders, hippocampus→KG+PPR), pattern separation (passage→discrete entity nodes), pattern completion (PPR traversal), with Mermaid diagrams and PathNotTaken for iterative retrieval approaches in src/content/pages/03-graph-rag/hipporag.mdx
- [x] T043 [US3] Write "Personalized PageRank" page with worked example: seed node selection from query entities, activation propagation through graph, subgraph extraction, and comparison to standard PageRank in src/content/pages/03-graph-rag/ppr.mdx
- [x] T044 [US3] Add prev/next links, prerequisites (graphrag requires problem-tree; ontology requires graphrag; lightrag requires graphrag; hipporag requires graphrag; ppr requires hipporag), relatedPages, and tags to all 5 graph-rag MDX files
- [x] T045 [US3] Verify graph-rag section builds and T038 passes by running `npm run test && npm run build`

**Checkpoint**: US3 complete — 5 graph-based RAG pages with ontological analysis, PPR worked example, and brain analogies. Run `npm run test` to verify.

---

## Phase 6: User Story 4 — Comparative Understanding & Synthesis (Priority: P4)

**Goal**: Learner sees the complete picture with progressive build-up map, indexing comparison, and decision guide

**Independent Test**: Learner can use comparison tools to select the right RAG approach for a scenario and articulate why alternatives are less suitable

### Tests for User Story 4 (write FIRST, must FAIL)

- [x] T046 [P] [US4] Write content validation test that verifies all 3 synthesis pages exist and cross-reference pages from all prior sections in tests/content/schema.test.ts (extend existing)

### Implementation for User Story 4

- [x] T047 [P] [US4] Write "Progressive Build-Up Map" page with Mermaid diagram showing Naive RAG as root with branches for each problem→solution pair, including paths not taken (rejected alternatives, unsolved problems) in src/content/pages/04-synthesis/progressive-map.mdx
- [x] T048 [P] [US4] Write "Indexing Strategy Comparison" page with ComparisonTable showing what each approach indexes (chunks, entities, communities, keywords, hypothetical questions), index structure, and best query types in src/content/pages/04-synthesis/indexing-comparison.mdx
- [x] T049 [US4] Write "Decision Guide" page with scenario-based recommendations that trace reasoning back to first principles, using ComparisonTable with filterColumn for use-case filtering in src/content/pages/04-synthesis/decision-guide.mdx
- [x] T050 [US4] Add prev/next links, prerequisites (all require problem-tree at minimum), relatedPages linking to all prior approach pages, and tags to all 3 synthesis MDX files
- [x] T051 [US4] Verify synthesis section builds and T046 passes by running `npm run test && npm run build`

**Checkpoint**: US4 complete — all 16 content pages exist with full navigation chain. Run full test suite to verify.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, performance, accessibility, and deployment readiness

- [x] T052 Verify complete linear path (prev/next) forms unbroken chain across all 16 pages by running all content tests
- [x] T053 [P] Add meta tags and Open Graph data to all pages for social sharing via Layout.astro
- [x] T054 [P] Add responsive design breakpoints for mobile reading in src/styles/global.css
- [x] T055 Run Lighthouse audit on built site and verify all pages score >90 on performance and accessibility
- [x] T056 Run quickstart.md validation: follow all steps from specs/001-rag-deep-dive/quickstart.md on a clean checkout
- [x] T057 Final build and deploy verification: `npm run build` produces complete static site in dist/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on Foundational phase completion — can run in parallel with US1
- **User Story 3 (Phase 5)**: Depends on Foundational phase completion — can run in parallel with US1/US2
- **User Story 4 (Phase 6)**: Depends on Foundational phase completion — content references all prior sections, but can start skeleton pages in parallel
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. No dependencies on other stories. MVP target.
- **User Story 2 (P2)**: After Phase 2. Cross-references US1 pages but independently testable.
- **User Story 3 (P3)**: After Phase 2. Cross-references US1 pages but independently testable.
- **User Story 4 (P4)**: After Phase 2. References pages from US1-US3 but can be built with placeholder links.

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Content schema must validate before page content
- MDX pages before cross-reference wiring
- Cross-references after all pages in section exist
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T003, T004, T005 can run in parallel
- Foundation tests T007, T008, T009, T010 can run in parallel
- Foundation components T012-T017 can run in parallel
- US1 content pages T024, T025 can run in parallel
- US2 content pages T031, T032, T033, T034 can run in parallel
- US3 content pages T039, T040, T041, T042 can run in parallel
- US4 content pages T047, T048 can run in parallel
- All 4 user stories can be worked on in parallel after Phase 2

---

## Parallel Example: User Story 1

```bash
# Launch tests first (must fail):
Task: "Write e2e progressive-path test in tests/e2e/progressive-path.test.ts"
Task: "Write comparison table test in tests/components/comparison.test.ts"

# Then launch content pages in parallel:
Task: "Write why-rag.mdx in src/content/pages/01-foundation/why-rag.mdx"
Task: "Write naive-rag.mdx in src/content/pages/01-foundation/naive-rag.mdx"

# Then sequential (depends on above):
Task: "Write problem-tree.mdx" (references content from why-rag and naive-rag)
Task: "Wire cross-references across all 3 foundation pages"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T020)
3. Complete Phase 3: User Story 1 (T021-T029)
4. **STOP and VALIDATE**: Site has landing page + 3 foundation pages
5. Deploy/demo the foundation section

### Incremental Delivery

1. Setup + Foundational → Framework ready
2. Add US1 (foundation) → Test → Deploy (MVP — teaches why RAG + Naive RAG)
3. Add US2 (retrieval strategies) → Test → Deploy (adds symmetry problem + HyDE/HyPE/Hybrid)
4. Add US3 (graph RAG) → Test → Deploy (adds GraphRAG/LightRAG/HippoRAG + ontology)
5. Add US4 (synthesis) → Test → Deploy (adds comparison map + decision guide)
6. Polish → Final deploy

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (3 pages)
   - Developer B: User Story 2 (5 pages)
   - Developer C: User Story 3 (5 pages)
   - Developer D: User Story 4 (3 pages)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Constitution requires Test-First: all test tasks MUST be completed and verified to FAIL before corresponding implementation tasks
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All content must include Mermaid diagrams per spec FR-011 (concrete examples)
- All concept pages must include PathNotTaken callouts per spec FR-007
- All pages must include prerequisite indicators per spec FR-008

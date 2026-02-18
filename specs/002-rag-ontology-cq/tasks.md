# Tasks: RAG Ontology with Competency Questions

**Input**: Design documents from `/specs/002-rag-ontology-cq/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Included per constitution (Test-First principle is NON-NEGOTIABLE). Tests are written FIRST and MUST FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (No New Infrastructure)

**Purpose**: No setup tasks needed — this feature adds content to an existing site. All infrastructure (Astro, MDX, Mermaid, Vitest, Playwright) is already in place from feature 001.

---

## Phase 2: Foundational (Test Updates + Navigation Chain)

**Purpose**: Update existing tests to expect 19 pages instead of 16, and prepare navigation chain changes that all user stories depend on.

**CRITICAL**: No content pages can be added until the test expectations are updated (tests must FAIL first).

- [x] T001 Update REQUIRED_PAGES list in tests/content/schema.test.ts to include 3 new page slugs: 03-graph-rag/competency-questions, 03-graph-rag/rag-ontology-map, 03-graph-rag/foundational-ontologies (total: 19 pages)
- [x] T002 [P] Write e2e test verifying navigation from PPR page through 3 new ontology pages to Progressive Map in tests/e2e/ontology-navigation.test.ts
- [x] T003 [P] Update navigation test in tests/components/navigation.test.ts to expect 8 pages in graph-rag section (was 5)
- [x] T004 Verify tests FAIL by running `npm run test` (schema test should fail on missing pages, navigation test should fail on page count)

**Checkpoint**: Tests updated and failing — ready for content implementation.

---

## Phase 3: User Story 1 — Competency Questions Introduction (Priority: P1) MVP

**Goal**: Learner understands the Gruninger & Fox methodology and all 5 CQ types (SCQ, VCQ, FCQ, RCQ, MpCQ) with RAG-specific examples

**Independent Test**: Navigate to CQ page, read all 5 CQ types with RAG examples, verify Mermaid methodology diagram renders

### Implementation for User Story 1

- [x] T005 [US1] Write "Competency Questions for RAG" page with Gruninger & Fox methodology overview, Mermaid flowchart of the 6-step CQ process, and subsections for each of the 5 CQ types (SCQ, VCQ, FCQ, RCQ, MpCQ) each with 2+ RAG examples in src/content/pages/03-graph-rag/competency-questions.mdx
- [x] T006 [US1] Update prev/next in src/content/pages/03-graph-rag/ppr.mdx: change next from "04-synthesis/progressive-map" to "03-graph-rag/competency-questions"
- [x] T007 [US1] Verify CQ page builds and schema test passes for competency-questions slug by running `npm run test && npm run build`

**Checkpoint**: US1 complete — CQ introduction page exists with all 5 types explained.

---

## Phase 4: User Story 2 — RAG Ontology Map (Priority: P2)

**Goal**: Learner sees the full RAG ontology visually with 15+ concepts mapped to DOLCE categories in Mermaid class diagrams

**Independent Test**: Open RAG Ontology Map page, verify Mermaid class diagram renders with endurant/perdurant/quality/role distinctions

### Implementation for User Story 2

- [x] T008 [US2] Write "RAG Ontology Map" page with Mermaid classDiagram showing 15+ RAG concepts organized under DOLCE categories (Endurant, Perdurant, Quality, Abstract), entity descriptions noting which CQ type justified inclusion, and tables mapping RAG concepts to ontological categories in src/content/pages/03-graph-rag/rag-ontology-map.mdx
- [x] T009 [US2] Verify ontology map page builds and Mermaid diagram renders by running `npm run test && npm run build`

**Checkpoint**: US2 complete — visual ontology map with 15+ classified RAG concepts.

---

## Phase 5: User Story 3 — Foundational Ontology Comparison (Priority: P3)

**Goal**: Learner understands DOLCE, BFO, and SUMO differences and can articulate why DOLCE suits RAG

**Independent Test**: Navigate to comparison page, verify comparison table covers 3 ontologies with 5+ criteria, and Mermaid diagrams show differing categorizations

### Implementation for User Story 3

- [x] T010 [US3] Write "Foundational Ontologies for RAG" page with DOLCE/BFO/SUMO comparison table (5+ criteria), Mermaid diagrams showing how "Retrieval" maps differently in each framework, PathNotTaken callout for skipping foundational ontologies, and cross-references to existing ontology and CQ pages in src/content/pages/03-graph-rag/foundational-ontologies.mdx
- [x] T011 [US3] Update prev in src/content/pages/04-synthesis/progressive-map.mdx: change prev from "03-graph-rag/ppr" to "03-graph-rag/foundational-ontologies"
- [x] T012 [US3] Verify all 3 new pages build, navigation chain is unbroken, and all tests pass by running `npm run test && npm run build`

**Checkpoint**: US3 complete — all 3 new pages exist with full navigation chain (19 pages total).

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all new pages

- [x] T013 Verify complete linear path (prev/next) forms unbroken 19-page chain by running all content tests
- [x] T014 [P] Verify cross-references between new pages and existing ontology/graphrag pages resolve correctly
- [x] T015 Run quickstart.md validation: follow all 6 verification steps from specs/002-rag-ontology-cq/quickstart.md
- [x] T016 Final build verification: `npm run build` produces 20-page static site (1 index + 19 content)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — starts immediately. Updates tests to FAIL.
- **User Story 1 (Phase 3)**: Depends on Phase 2 (tests must be updated first)
- **User Story 2 (Phase 4)**: Depends on Phase 2. Can run in parallel with US1 (different file).
- **User Story 3 (Phase 5)**: Depends on Phase 2. Can run in parallel with US1/US2 (different file). Navigation chain wiring (T011) should run after T005/T008.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. Writes competency-questions.mdx + updates ppr.mdx next link. MVP target.
- **User Story 2 (P2)**: After Phase 2. Writes rag-ontology-map.mdx. Independently testable.
- **User Story 3 (P3)**: After Phase 2. Writes foundational-ontologies.mdx + updates progressive-map.mdx prev link. Completes navigation chain.

### Within Each User Story

- Tests MUST be written and FAIL before implementation (Phase 2 handles this for all stories)
- Content page creation before cross-reference wiring
- Navigation chain updates after page exists
- Story verification after all files written

### Parallel Opportunities

- T002 and T003 can run in parallel (different test files)
- T005 (US1), T008 (US2), and T010 (US3) write different MDX files — can run in parallel after Phase 2
- T006 and T011 update different existing files — can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Update tests (FAIL)
2. Complete Phase 3: Write CQ page + update ppr.mdx
3. **STOP and VALIDATE**: CQ page renders, Mermaid diagram works, navigation from PPR works

### Incremental Delivery

1. Phase 2 → Tests updated and failing
2. Add US1 (CQ page) → Test → 17 pages working
3. Add US2 (Ontology Map) → Test → 18 pages working
4. Add US3 (Foundational Comparison) → Test → 19 pages, full chain complete
5. Phase 6 → Polish and final validation

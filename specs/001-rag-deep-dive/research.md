# Research: RAG Deep Dive Exploratory Website

**Date**: 2026-02-17
**Feature**: 001-rag-deep-dive

## Decision 1: Static Site Framework

**Decision**: Astro 5.x with MDX integration

**Rationale**:
- Content-first architecture designed for exactly this use case
- Zero JavaScript by default (pages load in <1s)
- Native MDX support with Content Collections API
- Zod-based schema validation for content frontmatter (aligns with
  Defensive Engineering principle)
- Islands architecture: add interactivity only where needed (comparison
  filters) without shipping JS for all pages
- TypeScript strict mode fully supported with auto-generated types
- 40% faster load times and 90% less JavaScript than Next.js
- 3x faster builds than Next.js for content-heavy sites

**Alternatives considered**:
- **Next.js**: Overkill — ships React runtime (200-400KB) even for
  static pages. Has SSR/API routes we don't need. Violates YAGNI.
- **Plain HTML/CSS/JS**: Requires building custom content pipeline,
  routing, cross-references from scratch. Violates YAGNI by
  reinventing what Astro provides.
- **Docusaurus**: Good for docs but opinionated about structure.
  Less flexible for custom educational layouts and progressive paths.

## Decision 2: Content Authoring Format

**Decision**: MDX (Markdown + JSX components)

**Rationale**:
- Write educational content naturally in Markdown
- Embed custom components (diagrams, comparison tables, callouts)
  inline without leaving the content file
- Content Collections validate frontmatter with Zod schemas
- Version-control friendly (plain text diffs)
- Authors can focus on content, not markup

**Alternatives considered**:
- **Plain Markdown**: Lacks component embedding for interactive
  elements (comparison filters, diagram blocks)
- **HTML templates**: Poor authoring experience for content-heavy
  pages, harder to review/maintain
- **CMS (Contentful, Sanity)**: External dependency for a static
  site. Adds complexity, hosting cost, and API calls. Violates YAGNI.

## Decision 3: Diagram & Visualization Strategy

**Decision**: Mermaid (primary, build-time) + selective SVG for
custom visuals

**Rationale**:
- Mermaid diagrams are text-based and version-control friendly
- Rendered at build time (zero client-side JS for diagrams)
- Supports flowcharts, sequence diagrams, and graph diagrams — covers
  all RAG pipeline visualizations
- 84K+ GitHub stars, mature ecosystem
- Can be embedded directly in MDX

**Alternatives considered**:
- **D3.js**: Full-featured but requires significant JS. Overkill for
  educational diagrams. Would violate zero-JS-by-default goal.
- **Excalidraw/draw.io**: Binary image files, not version-control
  friendly, can't be updated programmatically
- **Custom SVG only**: High authoring cost for every diagram

**Where Mermaid falls short**: The progressive build-up map (US4)
may need a custom SVG or a pre-built interactive component. This is
the one place where a React island with client-side interactivity
may be justified.

## Decision 4: Testing Strategy

**Decision**: Vitest (content validation + component tests) +
Playwright (e2e navigation)

**Rationale**:
- Vitest: Native TypeScript/ESM support, fast, works with Astro
- Content validation tests ensure: all frontmatter is valid, all
  cross-references resolve to existing pages, prerequisite chains
  are acyclic, all Mermaid diagrams parse without errors
- Playwright: Validates navigation flows (progressive path,
  non-linear jumps, 2-click cross-reference requirement from SC-004)
- Test-first per constitution: write content schema tests before
  content, write navigation tests before components

**Alternatives considered**:
- **Jest**: Slower, less native ESM support, heavier config
- **Cypress**: Heavier than Playwright, more suited to app testing
- **Manual testing only**: Violates Test-First principle

## Decision 5: Cross-Reference Strategy

**Decision**: Frontmatter-based related pages + inline MDX links

**Rationale**:
- Each page declares `relatedPages` in frontmatter (type-checked by
  Zod schema)
- Inline cross-references use standard MDX links to other content
  pages
- A Vitest test validates all references resolve to existing pages
  at build time (broken links caught before deploy)
- PrerequisiteBar component reads `prerequisites` from frontmatter
  and renders quick-link summaries

**Alternatives considered**:
- **Wiki-style [[backlinks]]**: Requires custom MDX plugin. More
  magical, harder to debug. Not worth the complexity.
- **Global link registry**: Premature abstraction for 15-20 pages.

## Decision 6: Navigation Model

**Decision**: Dual navigation — numbered linear path + topic sidebar

**Rationale**:
- Linear path: Content pages are numbered (01-foundation, 02-strategies,
  etc.) with prev/next links for progressive reading
- Topic sidebar: Always visible, shows all sections with current
  position highlighted for non-linear access
- ProgressTracker component shows how far through the learning path
  the reader has progressed
- Meets FR-014 (linear + non-linear navigation) and SC-004 (2-click
  cross-reference)

**Alternatives considered**:
- **Linear only**: Frustrating for readers who want to jump to
  specific topics (violates FR-014)
- **Wiki-style only**: No guided path, reader doesn't know where to
  start (violates FR-001 progressive build-up)

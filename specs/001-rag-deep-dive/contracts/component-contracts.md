# Component Contracts

**Date**: 2026-02-17
**Feature**: 001-rag-deep-dive

## Overview

This document defines the interface contracts for each Astro component.
Since this is a static site (no REST/GraphQL API), the contracts are
component prop interfaces.

## Layout.astro

**Purpose**: Base HTML shell with head, meta tags, and global styles.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Page title for `<title>` tag |
| description | string | Yes | Meta description |

## PageLayout.astro

**Purpose**: Wraps content pages with navigation, prerequisites, and
progress tracker.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Page heading |
| section | Section | Yes | Current section |
| order | number | Yes | Position in section |
| prerequisites | string[] | No | Required prior reading slugs |
| relatedPages | string[] | No | Related page slugs |
| prev | string | No | Previous page slug |
| next | string | No | Next page slug |
| tags | string[] | No | Concept tags |

**Renders**: Layout + Navigation + PrerequisiteBar + ProgressTracker +
content slot + CrossReference sidebar

## Navigation.astro

**Purpose**: Sidebar showing all sections and pages with current
position highlighted.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentSlug | string | Yes | Currently active page slug |
| currentSection | Section | Yes | Currently active section |

**Behavior**:
- Shows all 4 sections as collapsible groups
- Current section expanded by default
- Current page highlighted
- Each page shows title from content collection

## PrerequisiteBar.astro

**Purpose**: Banner at top of page showing required prior reading.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| prerequisites | string[] | Yes | Slugs of prerequisite pages |

**Behavior**:
- If prerequisites is empty, render nothing
- Otherwise render a bar with links to each prerequisite page
- Each link shows the page title (resolved from content collection)

## CrossReference.astro

**Purpose**: Inline link to a related concept on another page.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| slug | string | Yes | Target page slug |
| label | string | No | Override display text (defaults to page title) |

## ComparisonTable.astro

**Purpose**: Structured table for comparing RAG approaches.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | string[] | Yes | Column headers |
| rows | Record<string, string>[] | Yes | Row data |
| filterColumn | string | No | Column to enable filtering on |

**Behavior**:
- Renders a responsive HTML table
- If filterColumn is set, renders filter buttons above the table
- Filter buttons show/hide rows based on filterColumn values
- Filtering uses CSS classes (no client-side JS needed for basic
  show/hide via `:target` or `details`/`summary`)

## PathNotTaken.astro

**Purpose**: Callout block showing alternative approaches and why
they weren't chosen.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Name of the alternative approach |
| reason | string | Yes | Why it wasn't chosen / its drawbacks |

**Renders**: A visually distinct callout (different background, border)
with the alternative name and explanation.

## DiagramBlock.astro

**Purpose**: Wrapper for Mermaid diagrams with caption support.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| caption | string | No | Caption text below the diagram |
| alt | string | Yes | Accessible description of the diagram |

**Renders**: A `<figure>` containing the Mermaid output and an
optional `<figcaption>`.

## ProgressTracker.astro

**Purpose**: Shows position in the learning path.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentIndex | number | Yes | Current page index (0-based) |
| totalPages | number | Yes | Total pages in the path |
| sectionName | string | Yes | Current section display name |

**Renders**: A progress bar or step indicator showing "Page X of Y"
and current section name.

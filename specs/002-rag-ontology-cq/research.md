# Research: RAG Ontology with Competency Questions

**Date**: 2026-02-18
**Feature**: 002-rag-ontology-cq

## Decision 1: Page Placement in Navigation

**Decision**: Insert 3 new pages in the graph-rag section (order 6, 7, 8) between PPR and Progressive Map.
**Rationale**: The CQ and ontology content directly extends the ontological analysis started in the existing ontology page. Placing them in graph-rag maintains thematic cohesion.
**Alternatives considered**: Creating a new "ontology-engineering" section — rejected because it would fragment related content and require schema changes.

## Decision 2: CQ Types Coverage

**Decision**: Cover all 5 CQ types (SCQ, VCQ, FCQ, RCQ, MpCQ) on a single page with subsections.
**Rationale**: The types are interrelated and best understood together. Splitting into 5 separate pages would create too-thin content and navigation overhead.
**Alternatives considered**: One page per CQ type — rejected per YAGNI (5 thin pages vs 1 comprehensive page).

## Decision 3: Primary Foundational Ontology

**Decision**: Use DOLCE as the primary framework for the RAG ontology map, with BFO and SUMO as comparison alternatives.
**Rationale**: DOLCE's treatment of non-physical endurants (information objects like documents/chunks) and its rich process taxonomy (state vs process vs achievement vs accomplishment) maps most naturally to RAG concepts. BFO is realist/minimal and better suited to biomedical domains. SUMO is larger but less commonly used for this domain.
**Alternatives considered**: BFO-first (rejected: weaker information object modeling), SUMO-first (rejected: less tooling/community adoption for AI domains).

## Decision 4: Mermaid Diagram Type for Ontology Map

**Decision**: Use Mermaid `classDiagram` for the main ontology map and `flowchart` for the CQ methodology workflow.
**Rationale**: Class diagrams naturally express is-a hierarchies, properties, and relationships — exactly what an ontology map needs. Flowcharts work for showing the sequential CQ methodology.
**Alternatives considered**: Entity-relationship diagrams — rejected because Mermaid's ER diagram syntax is limited for ontological hierarchies.

## Decision 5: OntoClean Depth

**Decision**: Introduce OntoClean at an accessible level — explain the 4 meta-properties with RAG examples but do not formalize with full notation (e.g., +R/-R/~R shown in tables, not in formal logic).
**Rationale**: The target audience is exploring RAG, not studying formal ontology. Enough depth to understand why "RetrievedChunk" is a role (anti-rigid) not a type, without requiring logic background.
**Alternatives considered**: Full formal treatment — rejected per Simplicity & YAGNI.

## Decision 6: No New Components Needed

**Decision**: Reuse all existing components (DiagramBlock, CrossReference, PathNotTaken, ComparisonTable).
**Rationale**: The existing component library fully covers the content needs. No new visual patterns are required.
**Alternatives considered**: Creating an OntologyNode component for interactive exploration — rejected per YAGNI (no second use case).

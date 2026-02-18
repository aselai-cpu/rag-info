# Feature Specification: RAG Ontology with Competency Questions

**Feature Branch**: `002-rag-ontology-cq`
**Created**: 2026-02-18
**Status**: Draft
**Input**: User description: "Improve the documentation by adding section on ontology of RAG. How to approach this with Competency Questions, understanding what fundamental ontologies it can be based on based on scope CQ, validation CQ, MpCQ, RCQ, FCQs etc. Use mermaid to depict ontology of RAGs"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Competency Questions Introduction (Priority: P1)

A learner who has completed the existing Graph RAG ontology page wants to understand **how** ontologists systematically design ontologies. They navigate to a new "Competency Questions for RAG" page and discover the Gruninger & Fox methodology: what competency questions are, why they matter, and the five CQ types (SCQ, VCQ, FCQ, RCQ, MpCQ). Each CQ type is explained with concrete RAG examples and a Mermaid diagram showing how CQs drive ontology design. The learner leaves understanding how to formulate questions that define what an ontology must represent.

**Why this priority**: This is the foundational concept — without understanding CQs, the learner cannot appreciate how ontologies are rigorously designed rather than ad-hoc assembled. It directly addresses the user's core request.

**Independent Test**: Navigate to the CQ introduction page, read through all 5 CQ types with their RAG examples, and verify Mermaid diagrams render correctly.

**Acceptance Scenarios**:

1. **Given** the learner is on the existing ontology page, **When** they follow the "next" link, **Then** they arrive at the Competency Questions page with clear definitions and examples of all 5 CQ types.
2. **Given** the learner is reading about SCQs, **When** they see a RAG-specific example, **Then** it demonstrates how a scoping question defines ontology boundaries (e.g., "What types of documents can form a RAG corpus?").
3. **Given** the learner views the CQ methodology Mermaid diagram, **When** the page loads, **Then** a rendered flowchart shows the progression from motivating scenarios through CQs to axioms.

---

### User Story 2 - RAG Ontology Depicted in Mermaid (Priority: P2)

A learner wants to see the full ontology of RAG concepts visually. They navigate to a new "RAG Ontology Map" page that presents a comprehensive Mermaid class diagram mapping RAG entities to ontological categories. The diagram distinguishes endurants (Document, Chunk, EmbeddingVector, VectorIndex) from perdurants (Ingestion, Retrieval, Generation, QuerySession), shows qualities (RelevanceScore, EmbeddingDistance), and marks roles (Retriever, Generator). The learner sees how DOLCE foundational categories anchor each RAG concept and understands the entity-relationship structure of the entire RAG domain.

**Why this priority**: The visual ontology map is the centerpiece of the user's request — "use mermaid to depict ontology of RAGs." It synthesizes the CQ methodology into a concrete artifact.

**Independent Test**: Open the RAG Ontology Map page and verify the Mermaid diagram renders a complete class hierarchy with endurant/perdurant/quality/role distinctions clearly labeled.

**Acceptance Scenarios**:

1. **Given** the learner navigates to the RAG Ontology Map, **When** the page loads, **Then** a Mermaid class diagram shows at least 15 RAG concepts organized under DOLCE categories (Endurant, Perdurant, Quality, Abstract).
2. **Given** the learner examines the diagram, **When** they look at "Retrieval," **Then** it is classified as a Perdurant (Process) with relationships to Query and DocumentChunk.
3. **Given** the learner reads the accompanying text, **When** they encounter each entity, **Then** an explanation states which CQ type justified its inclusion (e.g., "FCQ-RAG-2 determined that Retrieval is a perdurant").

---

### User Story 3 - Foundational Ontology Comparison (Priority: P3)

A learner wants to understand which foundational ontology (DOLCE, BFO, SUMO) best suits a RAG ontology and why. They navigate to a comparison page that presents each foundational ontology's strengths for modeling RAG concepts, with a comparison table and Mermaid diagrams showing how the same RAG concept (e.g., "Retrieval") maps differently in each framework. The learner can articulate why DOLCE's treatment of information objects and process taxonomy makes it well-suited to RAG.

**Why this priority**: Choosing a foundational ontology is important but builds on the CQ and ontology map foundations. It deepens understanding for advanced learners.

**Independent Test**: Navigate to the comparison page, verify the comparison table covers all three ontologies, and confirm Mermaid diagrams show differing categorizations.

**Acceptance Scenarios**:

1. **Given** the learner opens the foundational ontology comparison page, **When** they read the content, **Then** a comparison table shows DOLCE, BFO, and SUMO evaluated across criteria relevant to RAG (information modeling, process taxonomy, role handling).
2. **Given** the learner views a Mermaid diagram, **When** they examine the "Retrieval" concept, **Then** it shows distinct categorization paths in DOLCE (Process → Stative Perdurant) vs. BFO (Occurrent → Process) vs. SUMO (IntentionalProcess).

---

### Edge Cases

- What happens when a learner arrives at the CQ pages without reading the existing ontology page? Prerequisites and a prerequisite bar guide them back.
- How does the site handle very large Mermaid diagrams on mobile? Diagrams must remain scrollable and legible on small screens.
- What if a learner confuses CQ types? Each CQ type section includes a concrete RAG example and a "not to be confused with" note distinguishing it from similar types.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Site MUST include a "Competency Questions for RAG" page explaining the Gruninger & Fox methodology and all 5 CQ types (SCQ, VCQ, FCQ, RCQ, MpCQ) with RAG-specific examples
- **FR-002**: Site MUST include a "RAG Ontology Map" page with at least one Mermaid class diagram depicting RAG entities categorized by ontological type (endurant, perdurant, quality, abstract, role)
- **FR-003**: Site MUST include a "Foundational Ontologies for RAG" page comparing DOLCE, BFO, and SUMO with a comparison table and at least one Mermaid diagram per ontology
- **FR-004**: Each CQ type MUST include at least 2 concrete RAG examples showing how the question is formulated and what it reveals about the ontology
- **FR-005**: The RAG ontology Mermaid diagram MUST show at least 15 distinct RAG concepts with relationships and ontological category labels
- **FR-006**: All new pages MUST integrate into the existing navigation chain (prev/next links, sidebar, prerequisites, related pages)
- **FR-007**: MpCQ section MUST explain OntoClean meta-properties (rigidity, identity, unity, dependence) with RAG entity classifications
- **FR-008**: RCQ section MUST cover all 4 subtypes (arity, elementary fact, domain-range, relational property) with RAG relationship examples
- **FR-009**: New pages MUST include cross-references to the existing ontology page (endurants/perdurants) and the GraphRAG page
- **FR-010**: Each new page MUST use existing site components (DiagramBlock, CrossReference, PathNotTaken, ComparisonTable) where applicable

### Key Entities

- **Competency Question**: A natural language question defining what an ontology must answer; has type (SCQ/VCQ/FCQ/RCQ/MpCQ), domain context, and expected answer form
- **CQ Type**: One of five categories (Scoping, Validation, Foundational, Relationship, Meta-property) with distinct purpose and usage phase
- **Foundational Ontology**: An upper-level ontology framework (DOLCE, BFO, SUMO) providing top-level categories for domain alignment
- **OntoClean Meta-property**: One of four entity classification properties (Rigidity, Identity, Unity, Dependence) used in MpCQ analysis
- **RAG Ontological Entity**: A RAG concept classified into an ontological category (endurant, perdurant, quality, abstract, role) through CQ analysis

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Learner can name and describe all 5 CQ types after reading the CQ introduction page (verified by content covering all 5 with definitions and examples)
- **SC-002**: Learner can identify whether a RAG concept is an endurant or perdurant by consulting the ontology map (verified by at least 15 concepts classified in the diagram)
- **SC-003**: Learner can articulate why DOLCE suits RAG ontology design after reading the comparison page (verified by comparison table with at least 5 evaluation criteria)
- **SC-004**: All 3 new pages load in under 2 seconds and Mermaid diagrams render correctly on desktop and mobile viewports
- **SC-005**: New pages are reachable from existing content through no more than 2 navigation clicks (sidebar or cross-reference links)
- **SC-006**: All existing tests continue to pass after adding the new pages (schema validation, cross-references, prerequisite acyclicity, navigation structure)

## Assumptions

- The existing ontology page (endurants/perdurants in GraphRAG context) provides sufficient background for learners to engage with CQs
- DOLCE is used as the primary foundational ontology for the RAG ontology map, with BFO and SUMO presented as alternatives in the comparison
- The 3 new pages are added to the existing "graph-rag" section since they extend the ontological analysis already started there
- Mermaid class diagrams are sufficient to depict ontological hierarchies (no need for OWL/Protege tooling)
- The OntoClean methodology is explained at an introductory level — full formal treatment is out of scope

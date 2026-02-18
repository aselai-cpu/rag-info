# Feature Specification: RAG Deep Dive Exploratory Website

**Feature Branch**: `001-rag-deep-dive`
**Created**: 2026-02-17
**Status**: Draft
**Input**: User description: "Build a website to understand RAGs: Naive RAG, Hybrid RAG, GraphRAG, LightRAG, HippoRAG with first-principles exploration from simplest to deepest ideas"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-Principles RAG Foundation (Priority: P1)

A learner with no prior RAG knowledge visits the website and wants to
understand why RAG exists and what fundamental problem it solves. They
start from the core assumption: LLMs have frozen knowledge and
hallucinate. The website walks them through the reasoning chain: why
retrieval is needed, what naive RAG does (chunk, embed, retrieve,
generate), and critically, where naive RAG breaks down. The learner
sees the limitations laid out as a "problem tree" — chunking dilemma,
no global context, symmetry mismatch, multi-hop reasoning failure —
so they understand that each subsequent RAG variant exists to solve a
specific limitation.

**Why this priority**: Without understanding the "why" and the baseline
(Naive RAG), nothing else makes sense. This is the conceptual
foundation that all other stories build upon.

**Independent Test**: Can be fully tested by navigating the foundation
section and verifying a learner can articulate: (1) why RAG exists,
(2) how naive RAG works, (3) its specific failure modes.

**Acceptance Scenarios**:

1. **Given** a learner on the landing page, **When** they begin the
   exploration, **Then** they see a clear "why RAG?" explanation
   grounded in first principles (knowledge cutoff, hallucination,
   grounding) before any technique is introduced.
2. **Given** a learner reading about Naive RAG, **When** they reach the
   limitations section, **Then** each limitation is presented as a
   named problem (symmetry mismatch, chunking dilemma, no global
   context, multi-hop failure) with a concrete example illustrating
   the failure.
3. **Given** a learner who has completed the foundation section,
   **When** they view the problem tree, **Then** they can see which
   RAG variant addresses which specific limitation, serving as a
   navigation map for the rest of the site.

---

### User Story 2 - Retrieval Challenges & Strategies Exploration (Priority: P2)

A learner who understands naive RAG's limitations now explores the
strategies that address retrieval quality problems. The site presents
three categories of solutions:

**Symmetry Problem Solutions**: The learner discovers that queries and
documents live in different embedding regions. They explore three paths:
(a) HyDE — transform the query into a hypothetical answer at query
time, (b) HyPE — transform documents into hypothetical questions at
index time, (c) Asymmetric Embeddings — use separate encoders for
queries vs documents. Each path is shown alongside the paths NOT taken,
clarifying why each approach exists and what trade-offs it makes.

**Sparse vs Dense Retrieval Gap**: The learner explores why keyword
search (BM25) and vector search each fail alone, and how Hybrid RAG
combines them through Reciprocal Rank Fusion.

**Why this priority**: These strategies represent the intermediate layer
of understanding. They solve retrieval-quality problems without
requiring graph structures, making them the natural next step.

**Independent Test**: Can be fully tested by navigating the challenges
section and verifying a learner can explain: (1) the symmetry problem,
(2) how HyDE/HyPE/asymmetric embeddings each solve it differently,
(3) why hybrid retrieval outperforms either sparse or dense alone.

**Acceptance Scenarios**:

1. **Given** a learner on the symmetry problem page, **When** they view
   the explanation, **Then** they see a visual contrast of query
   embeddings vs document embeddings in vector space, with a clear
   explanation of why they don't align.
2. **Given** a learner exploring HyDE, **When** they compare it to
   HyPE, **Then** the site presents both side-by-side showing that
   HyDE transforms at query time while HyPE transforms at index time,
   with explicit trade-off comparisons (latency vs indexing cost).
3. **Given** a learner exploring Hybrid RAG, **When** they view the
   fusion explanation, **Then** they see how BM25 results and vector
   results are combined via rank fusion, with an example showing a
   query where one method fails but the combination succeeds.

---

### User Story 3 - Graph-Based RAG Deep Dive (Priority: P3)

A learner who understands retrieval strategies now explores the
paradigm shift from "chunks as atoms" to "entities and relationships
as atoms." The site guides them through:

**GraphRAG (Microsoft)**: Entity extraction, relationship descriptions,
community detection (Hierarchical Leiden), and community summarization.
The learner understands global vs local vs DRIFT search modes. A
dedicated section covers the ontological lens: endurants (entities,
properties — things that persist) vs perdurants (processes, events,
states — things that unfold in time). The site highlights why
perdurants are commonly overlooked in knowledge graph extraction and
what is lost when they are treated as mere edge labels.

**LightRAG**: How it simplifies GraphRAG by eliminating expensive
community detection, using dual-level retrieval (low-level entities
+ high-level keywords) to achieve comparable results at a fraction of
the cost.

**HippoRAG**: The hippocampal memory analogy — neocortex (LLM for
extraction), parahippocampal regions (retrieval encoders for
synonymy), hippocampus (KG + Personalized PageRank). Pattern
separation (decomposing passages into discrete entity nodes) and
pattern completion (PPR traversal to recover full context from partial
cues). The learner understands how PPR enables multi-hop reasoning in
a single retrieval step.

**Why this priority**: Graph-based approaches represent the deepest
conceptual layer. They require understanding naive RAG and retrieval
strategies first.

**Independent Test**: Can be fully tested by navigating the graph RAG
sections and verifying a learner can explain: (1) how GraphRAG builds
and queries a knowledge graph, (2) endurants vs perdurants and why
perdurants matter, (3) how PPR enables multi-hop retrieval in
HippoRAG.

**Acceptance Scenarios**:

1. **Given** a learner on the GraphRAG page, **When** they explore
   the ontology section, **Then** they see endurants and perdurants
   defined with concrete examples, and a highlighted callout explaining
   why traditional KG extraction misses perdurants (events flattened
   to edge labels, temporal dynamics lost, causal chains missing).
2. **Given** a learner on the HippoRAG page, **When** they explore
   PPR, **Then** they see how seed nodes are identified from the
   query, how activation propagates through the graph, and how this
   mirrors hippocampal pattern completion — with a worked example.
3. **Given** a learner who has completed all three graph-based
   sections, **When** they view the comparison, **Then** they see a
   clear progression: GraphRAG (full-featured, expensive) → LightRAG
   (simplified, cost-effective) → HippoRAG (memory-inspired, multi-hop).

---

### User Story 4 - Comparative Understanding & Synthesis (Priority: P4)

A learner who has explored individual RAG approaches wants to see the
complete picture. The site provides:

**Progressive Build-Up Map**: A visual showing the evolution from Naive
RAG to advanced approaches, with each branch labeled by the specific
problem it solves. Paths not taken (alternative solutions that were
considered but rejected, or problems that remain unsolved) are shown
to create deeper understanding.

**Indexing Strategy Comparison**: What each approach indexes (chunks,
entities, communities, hypothetical questions, keywords), how it
indexes, and what queries it serves best.

**Decision Guide**: Given a specific use case (e.g., "I need to answer
questions spanning 100 documents"), the learner can trace which RAG
approach fits and why.

**Why this priority**: Synthesis requires all prior knowledge. This is
the capstone that turns individual understanding into practical wisdom.

**Independent Test**: Can be fully tested by verifying a learner can
use the comparison tools to select the right RAG approach for a given
scenario and articulate why alternatives are less suitable.

**Acceptance Scenarios**:

1. **Given** a learner on the synthesis page, **When** they view the
   progressive build-up map, **Then** they see a clear visual showing
   Naive RAG as the root, with branches for symmetry fixes (HyDE/HyPE/
   asymmetric), keyword gaps (Hybrid), global context (GraphRAG), cost
   reduction (LightRAG), and multi-hop (HippoRAG).
2. **Given** a learner viewing the indexing comparison, **When** they
   compare approaches, **Then** they see a structured table showing
   what each approach indexes, the index structure, and the query
   types it handles best.
3. **Given** a learner using the decision guide, **When** they select
   a scenario, **Then** they see a recommended approach with reasoning
   that traces back to first principles.

---

### Edge Cases

- What happens when a learner jumps directly to an advanced topic
  (e.g., HippoRAG) without reading the foundation? The site MUST
  provide prerequisite indicators and quick-link summaries of
  required prior concepts.
- How does the site handle concepts that span multiple RAG variants
  (e.g., embedding is relevant to Naive RAG, HyDE, HyPE, and Hybrid
  RAG)? Cross-references MUST link related concepts across sections.
- What happens when a learner wants to compare only two specific
  approaches? The comparison view MUST support selective filtering.
- How does the site handle the varying depth of available information
  (e.g., GraphRAG has extensive documentation while HippoRAG is newer
  with less material)? Content depth MUST be proportional to each
  approach's conceptual complexity, not just available sources.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The website MUST present RAG concepts in a progressive
  build-up from first principles — starting with "why RAG?" before
  introducing any specific technique.
- **FR-002**: Each RAG variant (Naive, Hybrid, GraphRAG, LightRAG,
  HippoRAG) MUST have a dedicated section explaining what problem it
  solves, how it works, and its trade-offs.
- **FR-003**: The symmetry problem MUST be explained with the three
  solution strategies (HyDE, HyPE, Asymmetric Embeddings) presented
  as alternative paths with explicit trade-off comparisons.
- **FR-004**: The website MUST include an ontological analysis of
  GraphRAG constructs, distinguishing endurants (entities, properties)
  from perdurants (processes, events, states) with explanations of
  why perdurants are commonly overlooked.
- **FR-005**: Personalized PageRank MUST be explained in the context
  of HippoRAG with a worked example showing seed node selection,
  activation propagation, and subgraph extraction.
- **FR-006**: The website MUST include a progressive build-up map
  showing the evolution from Naive RAG to advanced approaches, with
  each branch labeled by the problem it addresses.
- **FR-007**: "Paths not taken" MUST be illustrated alongside chosen
  solutions — alternative approaches that were considered, their
  drawbacks, and why the chosen path was preferred — to deepen
  understanding through contrast.
- **FR-008**: Each concept page MUST include prerequisite indicators
  showing what prior concepts the reader needs to understand first.
- **FR-009**: The website MUST include an indexing strategy comparison
  showing what each approach indexes (chunks, entities, communities,
  keywords, hypothetical questions) and which query types each serves.
- **FR-010**: Cross-references MUST link related concepts across
  sections (e.g., "embeddings" appears in Naive RAG, HyDE, HyPE,
  and Hybrid RAG contexts).
- **FR-011**: The website MUST include concrete examples for each
  concept — not just abstract definitions but worked scenarios
  showing how data flows through each RAG pipeline.
- **FR-012**: The website MUST present graph constructs (entities,
  communities, relationship descriptions) with explanations of
  community detection and how communities enable global-scope queries.
- **FR-013**: The HippoRAG section MUST explain the brain-to-
  architecture analogy (neocortex → LLM, parahippocampal regions →
  retrieval encoders, hippocampus → KG + PPR) and the concepts of
  pattern separation and pattern completion.
- **FR-014**: The website MUST be navigable both linearly
  (progressive build-up path) and non-linearly (direct access to
  any specific topic).

### Key Entities

- **RAG Approach**: A specific retrieval-augmented generation strategy
  (e.g., Naive RAG, GraphRAG). Has a name, the problem it solves,
  how it works, its trade-offs, and relationships to other approaches.
- **Challenge**: A specific limitation or problem in retrieval (e.g.,
  symmetry mismatch, no global context). Has a description, affected
  approaches, and solution strategies.
- **Strategy**: A technique that addresses a specific challenge (e.g.,
  HyDE, community detection). Has a mechanism, trade-offs, and the
  challenge it solves.
- **Concept**: A foundational building block (e.g., embedding,
  chunking, Personalized PageRank). Appears across multiple
  approaches and sections.
- **Ontological Construct**: A classification within graph-based RAG
  (endurant vs perdurant). Has examples, properties, and implications
  for knowledge graph design.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner with no prior RAG knowledge can navigate the
  progressive path and correctly explain the purpose and mechanism of
  all five RAG approaches within 60 minutes of reading.
- **SC-002**: 80% of learners can correctly identify which RAG
  approach best fits a given scenario after completing the synthesis
  section.
- **SC-003**: Every concept page loads and is fully readable within
  3 seconds on a standard connection.
- **SC-004**: A learner can navigate from any topic to any related
  topic in 2 clicks or fewer using cross-references.
- **SC-005**: The progressive build-up map accurately represents the
  evolutionary relationships between all covered RAG approaches, with
  zero missing connections between problems and their solutions.
- **SC-006**: 90% of learners report that the "paths not taken"
  sections improved their understanding compared to explanations
  without contrast.
- **SC-007**: Every worked example (PPR walkthrough, HyDE pipeline,
  community detection) is complete enough that a learner can trace
  the data flow from input to output without external references.

## Assumptions

- The target audience has basic familiarity with machine learning
  concepts (embeddings, vectors, LLMs) but no specific RAG knowledge.
- The website is a static educational resource (read-only content),
  not an interactive playground with live RAG pipelines.
- Content accuracy is based on published papers and official
  documentation (Microsoft GraphRAG, HippoRAG NeurIPS 2024, etc.)
  as of early 2026.
- The site does not require user accounts, authentication, or
  personalization.
- The website serves a single language (English).
- Diagrams and visual explanations are a core part of the content,
  not optional decoration.

# RAG Educator Agent Memory

## Project: rag-info educational site
- Astro 5.x + MDX + Mermaid static site
- 18 pages across 5 sections (foundation, retrieval-strategies, graph-rag, rag-ontology, synthesis)
- Located at /Users/aselaillayapparachchi/code/CSIT/rag-info/

## Key Findings from Full Review (2026-02-19)
- See detailed review in `site-review-2026-02.md`
- Overall quality: Strong first-principles approach, good pedagogical progression
- Main gaps: PPR damping factor explanation inverted, HyPE description mislabeled, missing chunking/evaluation/agentic RAG coverage
- Ontology section is unusually strong for a RAG tutorial - rare and valuable

## Common RAG Misconceptions (effective counter-explanations)
- "HyDE needs factual accuracy" -> No, structural similarity is what matters for embedding alignment
- "Cosine similarity is the problem" -> The problem is asymmetric inputs, not the metric itself
- "More chunks = better retrieval" -> Lost-in-the-middle phenomenon degrades LLM attention
- "Graph RAG replaces vector RAG" -> They address different failure modes, often combined
- "PPR damping factor alpha=0.85 means stay close to seeds" -> Actually it means 85% chance of following links (exploring), standard PageRank convention

## Effective Analogies
- PPR as "activation spreading from seed nodes" - works well for intuition
- Hippocampal memory model mapping - strong pedagogical device
- "Retrieval is the gatekeeper" - motivates why most RAG research is retrieval-focused

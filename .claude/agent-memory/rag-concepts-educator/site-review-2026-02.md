# Detailed Site Review - February 2026

## Technical Accuracy Issues
1. PPR damping factor explanation is inverted in hipporag.mdx
2. HyPE summary box incorrectly says "N extra LLM calls per query" - should be per chunk at index time
3. LightRAG "keyword-based retrieval" is oversimplified - also uses vector similarity
4. Progressive map layers are inconsistently numbered vs section ordering

## Missing Topics
- Chunking strategies (mentioned but not deep-dived)
- Evaluation metrics (MRR, NDCG, faithfulness, relevance)
- Reranking as a standalone topic
- Agentic RAG / tool-use patterns
- Context window management
- Prompt engineering for RAG
- Production concerns (monitoring, caching, rate limiting)

## Structural Observations
- 04-rag-ontology and 04-synthesis share the "04" prefix, potentially confusing
- No glossary page for terminology standardization
- Cross-references are well-used throughout

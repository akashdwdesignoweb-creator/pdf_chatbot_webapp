from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

class IndexStore:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.index = None
        self.text_chunks = []

    def build_index_from_text(self, text, chunk_size=500):
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
        self.text_chunks = chunks
        embeddings = self.model.encode(chunks, show_progress_bar=True)
        self.index = faiss.IndexFlatL2(embeddings.shape[1])
        self.index.add(np.array(embeddings))
        print(f"Built index with {len(chunks)} chunks.")

    def has_index(self):
        return self.index is not None

    def query(self, query_text, top_k=3):
        query_emb = self.model.encode([query_text])
        D, I = self.index.search(query_emb, top_k)
        matched_chunks = [self.text_chunks[i] for i in I[0]]
        return {"context": "\n".join(matched_chunks), "sources": I[0].tolist()}

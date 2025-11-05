import os
from dotenv import load_dotenv 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from extractor import extract_text_from_pdf
from embeddings_store import IndexStore
from llm_utils import generate_answer_from_context
import uvicorn

load_dotenv()  
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STORE = IndexStore()
PDF_PATH = os.getenv('PDF_PATH', './book.pdf')

class AskRequest(BaseModel):
    question: str

@app.on_event("startup")
def load_pdf_on_startup():
    print(f"Loading and indexing PDF: {PDF_PATH}")
    if not os.path.exists(PDF_PATH):
        raise FileNotFoundError(f"Cannot find {PDF_PATH}. Please place your PDF there.")
    text = extract_text_from_pdf(PDF_PATH)
    STORE.build_index_from_text(text)
    print("✅ PDF indexed and ready.")

@app.post("/ask")
async def ask(req: AskRequest):
    if not STORE.has_index():
        return {"error": "PDF not loaded yet."}
    retrieved = STORE.query(req.question)
    context = retrieved["context"]
    answer = generate_answer_from_context(req.question, context)
    return {"answer": answer, "context": context, "sources": retrieved["sources"]}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)

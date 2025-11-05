import os
import google.generativeai as genai
from dotenv import load_dotenv 
load_dotenv()  
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-2.5-flash')

def generate_answer_from_context(question: str, context: str) -> str:
    prompt = f"""
You are an assistant for Model Building Construction and Development Byelaws and 
Model Zoning Regulations for Development Authorities of 
Uttar Pradesh, 2025 that answers *only* using the provided CONTEXT below.
If the answer isn't in the CONTEXT, say: 'I don't know — the book doesn't mention this.'

CONTEXT:
{context}

QUESTION:
{question}

Answer clearly and factually using only the context but in  humanly way. Do not make up any information.
you can greet the user if it greets you.
Dont't say according to the provided context or anything similar.
"""
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating answer: {e}"

from pathlib import Path
import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.messages import HumanMessage, SystemMessage

# --------------------------------------------------
# Load environment
# --------------------------------------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing")

# --------------------------------------------------
# Paths
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
VECTORSTORE_PATH = BASE_DIR / "data" / "vectorstore" / "organic_paddy"

# --------------------------------------------------
# Load vectorstore
# --------------------------------------------------
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key=OPENAI_API_KEY
)

vectorstore = Chroma(
    persist_directory=str(VECTORSTORE_PATH),
    embedding_function=embeddings
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# --------------------------------------------------
# LLM
# --------------------------------------------------
llm = ChatOpenAI(
    model_name="gpt-4o-mini",
    temperature=0.2,
    openai_api_key=OPENAI_API_KEY
)

# --------------------------------------------------
# System prompt
# --------------------------------------------------
SYSTEM_PROMPT = """
You are an expert organic farming assistant specialized in ORGANIC PADDY cultivation in Tamil Nadu.

Rules:
1. Use ONLY the provided context.
2. Do NOT invent practices.
3. If information is missing, say clearly.
4. Answer strictly in the language requested.
5. Keep advice practical and farmer-friendly.
6. Use commonly spoken agricultural Tamil used by farmers in Tamil Nadu.
7. Avoid literal or bookish translations.

"""

# --------------------------------------------------
# Language detection
# --------------------------------------------------
def detect_language(text: str) -> str:
    for char in text:
        if "\u0B80" <= char <= "\u0BFF":
            return "tamil"
    return "english"

# --------------------------------------------------
# Ask function
# --------------------------------------------------
def ask_farmer_question(question: str):
    docs = retriever.invoke(question)

    if not docs:
        return "No relevant information found in the knowledge base."

    context = "\n\n".join(doc.page_content for doc in docs)
    language = detect_language(question)

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(
            content=f"""
Context:
{context}

Question:
{question}

Answer Language: {language}
"""
        )
    ]

    response = llm.invoke(messages)
    return response.content

# def ask_farmer_question(question: str):
#     # Use the correct method for retriever
#     docs = retriever.invoke(question)

#     context = "\n\n".join(doc.page_content for doc in docs)
#     language = detect_language(question)

#     messages = [
#         SystemMessage(content=SYSTEM_PROMPT),
#         HumanMessage(
#             content=f"""
# Context:
# {context}

# Question:
# {question}

# Answer Language: {language}
# """
#         )
#     ]

#     response = llm(messages)
#     return response.content

# --------------------------------------------------
# CLI test
# --------------------------------------------------
if __name__ == "__main__":
    print("Organic Paddy Assistant (English + Tamil)")
    print("----------------------------------------")

    while True:
        q = input("\nAsk a question (or type 'exit'): ")
        if q.lower() == "exit":
            break
        answer = ask_farmer_question(q)
        print("\n" + answer)

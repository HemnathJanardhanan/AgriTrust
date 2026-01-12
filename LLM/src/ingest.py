# src/ingest.py

from pathlib import Path
import os
from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing")

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "raw_pdfs" / "organic_paddy_tnau.txt"
VECTORSTORE_PATH = BASE_DIR / "data" / "vectorstore" / "organic_paddy"

loader = TextLoader(str(DATA_PATH), encoding="utf-8")
documents = loader.load()
print(f"Loaded {len(documents)} document(s)")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150
)
chunks = text_splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks")

embeddings = OpenAIEmbeddings(
    api_key=OPENAI_API_KEY,
    model="text-embedding-3-small"
)

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=str(VECTORSTORE_PATH)
)

vectorstore.persist()
print("Vectorstore created and saved")

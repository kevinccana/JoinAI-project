from fastapi import FastAPI
from app.routes import chat, health

app = FastAPI(
    title="JoinAI API",
    version="1.0.0"
)

app.include_router(chat.router)
app.include_router(health.router)

@app.get("/")
def root():
    return {"message": "API funcionando 🚀"}
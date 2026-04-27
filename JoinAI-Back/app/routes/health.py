from fastapi import FastAPI
from app.routes import chat, crisis, recursos

app = FastAPI(title="JoinAI API")

app.include_router(chat.router)
app.include_router(crisis.router)
app.include_router(recursos.router)

@app.get("/health")
def health():
    return {"status": "ok"}
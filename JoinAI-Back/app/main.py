from fastapi import FastAPI
from app.routes import chat,crisis,health,recursos

# 1. Crear la instancia de la aplicación
app = FastAPI(
    title="JoinAI API"
    description="API para acompañaniemto emocional con enfoque de Seguridad Primero",
    versión="1.0.0"
)

# 2. registo endpoints
app.include_router(chat.router)
app.include_router(crisis.router)
app.include_router(health.router)
app.include_router(recursos.router)

# prueba
@app.get("/health")
def health():
    return{"status":"ok"}

# 3. Definir una ruta 
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

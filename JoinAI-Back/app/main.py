from fastapi import FastAPI
from app.routes import chat, health, gemini
from fastapi.middleware.cors import CORSMiddleware  


app = FastAPI(
    title="JoinAI API",
    version="1.0.0"
)

#POLITICA DE CORS
app.add_middleware(
    CORSMiddleware,
    # Permite solicitudes desde el puerto de tu frontend de desarrollo
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (POST, GET, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

app.include_router(chat.router)
app.include_router(health.router)
app.include_router(gemini.router) 

@app.get("/")
def root():
    return {"message": "API funcionando 🚀"}
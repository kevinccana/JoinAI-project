from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/")
def chat(req: ChatRequest):
    texto = req.message.lower()

    if "triste" in texto:
        return ChatResponse(
            response="Lamento que te sientas así. ¿Quieres contarme más?",
            emotion="tristeza",
            crisis=False
        )

    if "suicidio" in texto:
        return ChatResponse(
            response="No estás solo. Busca ayuda inmediata.",
            emotion="crisis",
            crisis=True
        )

    return ChatResponse(
        response="Estoy aquí para escucharte.",
        emotion="neutral",
        crisis=False
    )
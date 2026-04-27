from fastapi import APIRouter
from model.chat import ChatRequest, ChatResponse
from app.services.nlp import detectar_crisis, detectar_emocion
from app.M04_GestorRecursos import ResourceManager

router = APIRouter()

manager = ResourceManager()

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):

    mensaje = req.message

    #crisis
    if detectar_crisis(mensaje):
        return ChatResponse(
            response="No estás solo. Llama a la Línea 113 opción 5 o busca ayuda inmediata."
        )

    # recursos
    recursos = manager.buscar_por_distrito(mensaje)
    if recursos:
        return ChatResponse(
            response=f"Encontré estos recursos cercanos: {recursos}"
        )

    # emoción
    emocion = detectar_emocion(mensaje)
    if emocion:
        return ChatResponse(response=emocion)

    # predeterminado
    return ChatResponse(
        response="Estoy aquí para escucharte. ¿Quieres contarme más?"
    )
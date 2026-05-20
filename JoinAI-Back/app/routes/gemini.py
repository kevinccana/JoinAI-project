# app/routes/gemini.py
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
# 1. Cargar las variables de entorno inmediatamente al importar este archivo
load_dotenv()
from google import genai
from google.genai import types



# 2. Inicializar el router de FastAPI
router = APIRouter()

# 3. Modelos de datos de Pydantic para el historial
class ChatMessage(BaseModel):
    role: str  # Debe ser "user" o "model"
    text: str

class ChatRequest(BaseModel):
    history: List[ChatMessage]

# 4. Configuración del rol psicológico (System Instruction)
SYSTEM_INSTRUCTION = """
Eres un asistente de apoyo psicológico empático, cálido y profesional. 
Tu objetivo es escuchar activamente, validar emociones y ofrecer estrategias de afrontamiento básicas. 

REGLAS CRÍTICAS:
1. No eres un psicólogo real ni puedes dar diagnósticos médicos. 
2. Si el usuario te pregunta sobre temas irrelevantes (cocina, programación, chistes, etc.), rechaza la pregunta amablemente diciendo que tu función es solo el apoyo emocional.
3. Si detectas ideas de suicidio o autolesión, activa el protocolo de crisis: muestra empatía profunda y proporciona líneas de ayuda o números de emergencia de inmediato.
"""

# 5. Endpoint para el Chat con Inteligencia Artificial
@router.post("/chatai")
async def chat_endpoint(request: ChatRequest):
    try:
        # Inicialización segura del cliente dentro del contexto de la petición
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=500, 
                detail="Error de configuración: GEMINI_API_KEY no encontrada en el servidor."
            )
            
        client = genai.Client(api_key=api_key)

        # Formatear el historial recibido al formato nativo del SDK de Gemini
        contents = []
        for msg in request.history:
            contents.append(
                types.Content(
                    role=msg.role,
                    parts=[types.Part.from_text(text=msg.text)]
                )
            )
        
        # Configurar las directrices del modelo
        config = types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.7, # Control de creatividad balanceado
        )

        # Consumir la API oficial de Google utilizando el modelo rápido recomendado
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config=config
        )

        return {"respuesta": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en Gemini API: {str(e)}")

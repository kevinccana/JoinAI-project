# app/routes/gemini.py
"""
Endpoint /chatai — Chat con IA y clasificación de riesgo psicosocial.

Responsabilidades de cada componente:
  - BETO (app/services/nlp.py) : clasifica el nivel de riesgo del mensaje
                                  del usuario (Control / Moderado / Crítico).
  - Gemini 2.5 Flash            : genera la respuesta empática en lenguaje natural.

El endpoint ejecuta ambas tareas y devuelve:
  - respuesta      : texto generado por Gemini.
  - nivel_riesgo   : nivel detectado por BETO ("control" | "moderado" | "critico").
  - video_sugerido : info del video recomendado si nivel == "moderado", sino null.
  - probabilidades : probabilidades por clase de BETO (útil para debug/logging).
"""
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

load_dotenv()

from google import genai
from google.genai import types
from app.services.nlp import clasificar_riesgo

# ── Router ─────────────────────────────────────────────────────────────────────
router = APIRouter()

# ── Modelos Pydantic ───────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str  # "user" | "model"
    text: str

class ChatRequest(BaseModel):
    history: List[ChatMessage]

# ── System Instruction para Gemini ────────────────────────────────────────────
SYSTEM_INSTRUCTION = """
Eres un asistente de apoyo psicológico empático, cálido y profesional.
Tu objetivo es escuchar activamente, validar emociones y ofrecer estrategias de afrontamiento básicas.

REGLAS CRÍTICAS:
1. No eres un psicólogo real ni puedes dar diagnósticos médicos.
2. Si el usuario te pregunta sobre temas irrelevantes (cocina, programación, chistes, etc.),
   rechaza la pregunta amablemente indicando que tu función es solo el apoyo emocional.
3. Si detectas ideas de suicidio o autolesión, activa el protocolo de crisis:
   muestra empatía profunda y proporciona líneas de ayuda o números de emergencia de inmediato.
"""

# ── Endpoint ───────────────────────────────────────────────────────────────────
@router.post("/chatai")
async def chat_endpoint(request: ChatRequest):
    """
    Procesa un mensaje de chat aplicando dos capas de análisis en paralelo:

    1. Clasificación de riesgo (BETO):
       - Extrae el último mensaje del usuario del historial.
       - Llama a clasificar_riesgo() para obtener nivel y video sugerido.
       - No bloquea ni modifica la respuesta de Gemini.

    2. Respuesta empática (Gemini 2.5 Flash):
       - Recibe el historial completo de la conversación.
       - Genera una respuesta contextualizada según el system instruction.

    El frontend usa nivel_riesgo para decidir qué mostrar:
      "control"  → solo muestra la respuesta en el chat.
      "moderado" → muestra la respuesta + VideoPopup con video_sugerido.
      "critico"  → muestra la respuesta + CrisisOverlay.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=500,
                detail="Error de configuración: GEMINI_API_KEY no encontrada en el servidor.",
            )

        # ── 1. Clasificación de riesgo con BETO ───────────────────────────────
        # Se toma el último mensaje con role "user" del historial.
        ultimo_mensaje = next(
            (msg.text for msg in reversed(request.history) if msg.role == "user"),
            "",
        )
        riesgo = clasificar_riesgo(ultimo_mensaje)

        # ── 2. Respuesta de Gemini ─────────────────────────────────────────────
        client = genai.Client(api_key=api_key)

        contents = [
            types.Content(
                role=msg.role,
                parts=[types.Part.from_text(text=msg.text)],
            )
            for msg in request.history
        ]

        config = types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.7,
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=config,
        )

        # ── 3. Respuesta unificada ─────────────────────────────────────────────
        return {
            "respuesta"     : response.text,
            "nivel_riesgo"  : riesgo["nivel"],
            "video_sugerido": riesgo["video_sugerido"],
            "probabilidades": riesgo["probabilidades"],
        }

    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Error en Gemini API: {str(exc)}")

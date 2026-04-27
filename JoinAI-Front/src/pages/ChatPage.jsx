import React, { useState, useRef, useEffect } from 'react';
import Message from '../components/Message';
import CrisisOverlay from '../components/CrisisOverlay';
import { sendMessage } from '../services/api';

function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hola, soy JoinAI. ¿Cómo te sientes hoy?", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);
  const [crisisInfo, setCrisisInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus al input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Enviar al backend
      const response = await sendMessage(inputValue);
      
      // Verificar si es crisis
      if (response.crisis_detected) {
        setCrisisInfo({
          message: response.response,
          contact: {
            name: "LÍNEA 113",
            number: "113",
            extension: "5"
          }
        });
        setShowCrisisOverlay(true);
      }
      
      // Agregar respuesta del bot
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: "Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo más tarde.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSOSClick = () => {
    setCrisisInfo({
      message: "No estás solo/a. Comunícate ahora:",
      contact: {
        name: "LÍNEA 113 • Salud Mental • Opción 5",
        number: "113",
        extension: "5"
      }
    });
    setShowCrisisOverlay(true);
  };

  return (
    <>
      <div className="chat-container">
        {/* Header con hora y botón SOS */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="logo-small">🧠</div>
            <span className="session-info">sesión #001 - iniciada {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <button className="sos-button" onClick={handleSOSClick}>
            🆘 SOS
          </button>
        </div>

        {/* Mensajes del chat */}
        <div className="messages-area">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="typing-indicator">
              <span>JoinAI está escribiendo</span>
              <div className="dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="input-area">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            rows={1}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="send-button"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Crisis Overlay */}
      {showCrisisOverlay && (
        <CrisisOverlay 
          info={crisisInfo}
          onClose={() => setShowCrisisOverlay(false)}
        />
      )}
    </>
  );
}

export default ChatPage;
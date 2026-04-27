import axios from 'axios';

// URL fija mientras pruebas
const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    // Respuesta de respaldo si el backend no está disponible
    return { 
      response: "I'm here for you. Tell me more about how you're feeling.",
      crisis_detected: false 
    };
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error' };
  }
};
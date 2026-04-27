import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';

function ResourcesPage() {
  const [backendStatus, setBackendStatus] = useState('verificando');

  useEffect(() => {
    const checkBackend = async () => {
      const result = await checkHealth();
      setBackendStatus(result.status === 'ok' ? 'conectado' : 'desconectado');
    };
    checkBackend();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">📍 Recursos de Salud Mental</h2>
      
      <div className="resources-list">
        <div className="resource-card">
          <h4>🏥 Línea 113 - Salud Mental</h4>
          <p>📞 Llama al <strong>113</strong> y pide la opción 5</p>
          <p>🕒 Disponible 24/7 | Gratuito</p>
        </div>
        
        <div className="resource-card">
          <h4>💚 Línea Esperanza</h4>
          <p>📞 <strong>0800-123-123</strong></p>
          <p>🕒 24/7 | Prevención del suicidio</p>
        </div>
        
        <div className="resource-card">
          <h4>📍 CSMC San Juan de Lurigancho</h4>
          <p>Av. Fernando Wiesse 1234, SJL</p>
          <p>📞 01 123456 | Lun a Vie 8am-4pm</p>
        </div>

        <div className="resource-card">
          <h4>📍 CSMC Comas</h4>
          <p>Av. Túpac Amaru Km 12, Comas</p>
          <p>📞 01 789012 | Lun a Vie 8am-4pm</p>
        </div>

        <div className="resource-card">
          <h4>📍 Hospital Dos de Mayo</h4>
          <p>Av. Miguel Grau 13, Cercado de Lima</p>
          <p>📞 01 456789 | Emergencias 24h</p>
        </div>
      </div>
      
      <div className="backend-status" style={{ marginTop: 30, fontSize: 12, color: 'var(--text-gray)' }}>
        Estado del servidor: {backendStatus === 'conectado' ? '🟢 Conectado' : backendStatus === 'desconectado' ? '🔴 Desconectado' : '🟡 Verificando...'}
      </div>
    </div>
  );
}

export default ResourcesPage;
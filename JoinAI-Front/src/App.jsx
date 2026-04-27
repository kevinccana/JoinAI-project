import React, { useState } from 'react';
import ChatPage from './pages/ChatPage';
import MoodLogPage from './pages/MoodLogPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState('chat');

  const renderPage = () => {
    switch(currentPage) {
      case 'chat':
        return <ChatPage />;
      case 'mood':
        return <MoodLogPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ChatPage />;
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo-area">
          <div className="logo">🧠</div>
          <h2>JoinAI</h2>
          <span className="tagline">acompañamiento emocional</span>
        </div>
        
        <nav className="menu">
          <button 
            className={`menu-item ${currentPage === 'chat' ? 'active' : ''}`}
            onClick={() => setCurrentPage('chat')}
          >
            💬 Nuevo Chat
          </button>
          <button className="menu-item disabled">📜 Historial</button>
          <button 
            className={`menu-item ${currentPage === 'mood' ? 'active' : ''}`}
            onClick={() => setCurrentPage('mood')}
          >
            📊 Registro de Ánimo
          </button>
          <button 
            className={`menu-item ${currentPage === 'resources' ? 'active' : ''}`}
            onClick={() => setCurrentPage('resources')}
          >
            📍 Recursos
          </button>
          <button 
            className={`menu-item ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('settings')}
          >
            ⚙️ Ajustes
          </button>
        </nav>
      </div>
      
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
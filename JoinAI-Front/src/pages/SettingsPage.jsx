import React from 'react';

function SettingsPage() {
  return (
    <div className="page-container">
      <h2 className="page-title">⚙️ Ajustes</h2>
      <p>Personaliza tu experiencia.</p>
      <p style={{ color: 'var(--text-gray)', marginTop: '20px' }}>
        Opciones de tema y notificaciones próximamente.
      </p>
    </div>
  );
}

export default SettingsPage;
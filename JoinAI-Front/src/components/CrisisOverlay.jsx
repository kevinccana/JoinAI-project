import React from 'react';

function CrisisOverlay({ info, onClose }) {
  const handleCallNow = () => {
    window.location.href = `tel:${info.contact.number}`;
  };

  return (
    <div className="crisis-overlay">
      <div className="crisis-card">
        <div className="crisis-header">
          <span className="sos-icon-large">🆘</span>
          <h2>SOS</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="crisis-content">
          <p className="crisis-message">{info.message}</p>
          <p className="crisis-submessage">No estás solo/a.<br/>Comunícate ahora:</p>
          
          <div className="crisis-contact">
            <div className="contact-name">{info.contact.name}</div>
            <div className="contact-number">{info.contact.number}</div>
            {info.contact.extension && (
              <div className="contact-extension">— Opción {info.contact.extension}</div>
            )}
          </div>
          
          <button className="call-now-button" onClick={handleCallNow}>
            📞 Llamar ahora
          </button>
        </div>
        
        <button className="close-bottom" onClick={onClose}>
          cerrar
        </button>
      </div>
    </div>
  );
}

export default CrisisOverlay;
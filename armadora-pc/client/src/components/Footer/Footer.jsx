import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p>🛠️ <strong>PC Builder Pro</strong> — Tu asistente inteligente de armado de PC.</p>
        <p className="footer-copy">© {new Date().getFullYear()} — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
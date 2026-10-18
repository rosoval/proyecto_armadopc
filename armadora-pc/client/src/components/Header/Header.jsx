import React from 'react';
import './Header.css';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="main-header">
      <div className="header-container">
        <h1 className="header-title">💻 PC Builder Pro</h1>
        <nav>
          <ul className="nav-tabs">
            <li>
              <button
                className={`nav-button ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                ¿Qué hace cada componente?
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${activeTab === 'guide' ? 'active' : ''}`}
                onClick={() => setActiveTab('guide')}
              >
                Tutorial de Armado
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${activeTab === 'builder' ? 'active' : ''}`}
                onClick={() => setActiveTab('builder')}
              >
                Sistema de Armado
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
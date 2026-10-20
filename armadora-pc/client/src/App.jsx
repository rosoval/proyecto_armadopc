import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PcBuilder from './components/PcBuilder/PcBuilder';
import InfoComponents from './components/InfoComponents/InfoComponents';
import AssemblyGuide from './components/AssemblyGuide/AssemblyGuide';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'guide', 'builder'
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar las categorías y productos desde el backend
    fetch('http://localhost:4000/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar las categorías:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === 'info' && <InfoComponents />}
        {activeTab === 'guide' && <AssemblyGuide />}
        {activeTab === 'builder' && (
          loading ? (
            <div className="loading-container">Cargando componentes...</div>
          ) : (
            <PcBuilder categories={categories} />
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
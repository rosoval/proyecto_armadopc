import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import InfoComponents from './components/InfoComponents/InfoComponents';
import AssemblyGuide from './components/AssemblyGuide/AssemblyGuide';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('info'); // Estado para controlar la vista activa
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/categories')
      .then(response => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      {/* 1. Header con la navegación por pestañas */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {/* Vista 1: ¿Qué hace cada componente? */}
        {activeTab === 'info' && <InfoComponents />}

        {/* Vista 2: Tutorial de Armado */}
        {activeTab === 'guide' && <AssemblyGuide />}

        {/* Vista 3: Sistema de Armado / Tienda Interactiva */}
        {activeTab === 'builder' && (
          <section className="catalog-section">
            <div className="builder-header">
              <h2>🛒 Sistema de Armado de PC</h2>
              <p>Selecciona los componentes para tu ensamble con validación de compatibilidad.</p>
            </div>

            {loading ? (
              <div className="app-loading">Cargando componentes...</div>
            ) : categories.length === 0 ? (
              <p className="app-empty">No hay categorías registradas en la base de datos.</p>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="category-card">
                  <h3 className="category-title">{cat.name}</h3>
                  
                  {cat.products.length === 0 ? (
                    <p className="empty-category">No hay productos disponibles en esta categoría.</p>
                  ) : (
                    <div className="products-grid">
                      {cat.products.map(product => (
                        <div key={product.id} className="product-card">
                          <div>
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-description">{product.description}</p>
                          </div>
                          
                          <div>
                            <div className="product-footer">
                              <span className="product-price">${product.price} USD</span>
                              <button className="add-button">Agregar</button>
                            </div>
                            
                            {(product.socket || product.ramType || product.wattage) && (
                              <div className="product-specs">
                                {product.socket && <span>Socket: {product.socket} | </span>}
                                {product.ramType && <span>Tipo: {product.ramType} | </span>}
                                {product.wattage && <span>Consumo: {product.wattage}W</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
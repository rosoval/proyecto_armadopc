import React, { useState } from 'react';
import './PcBuilder.css';

export default function PcBuilder({ categories = [] }) {
  const [selectedParts, setSelectedParts] = useState({});

  const handleSelectPart = (categoryName, product) => {
    if (!categoryName || !product) return;
    setSelectedParts(prev => ({
      ...prev,
      [categoryName]: product
    }));
  };

  const handleRemovePart = (categoryName) => {
    setSelectedParts(prev => {
      const updated = { ...prev };
      delete updated[categoryName];
      return updated;
    });
  };

  const safeCategories = Array.isArray(categories) ? categories.filter(Boolean) : [];

  const getSelectedFor = (keyword) => {
    const cat = safeCategories.find(c => c && typeof c.name === 'string' && c.name.toLowerCase().includes(keyword));
    return cat ? selectedParts[cat.name] : null;
  };

  const selectedCpu = getSelectedFor('procesador');
  const selectedMotherboard = getSelectedFor('placa madre');
  const selectedRam = getSelectedFor('memoria ram');
  const selectedPsu = getSelectedFor('fuente');

  let socketMatch = true;
  if (selectedCpu?.socket && selectedMotherboard?.socket) {
    if (selectedCpu.socket !== selectedMotherboard.socket) {
      socketMatch = false;
    }
  }

  let ramMatch = true;
  if (selectedMotherboard?.ramType && selectedRam?.ramType) {
    if (selectedMotherboard.ramType !== selectedRam.ramType) {
      ramMatch = false;
    }
  }

  const totalWattage = Object.values(selectedParts).reduce((acc, part) => acc + (part?.wattage || 0), 0);
  let psuSufficient = true;
  if (selectedPsu?.wattage && selectedPsu.wattage < totalWattage) {
    psuSufficient = false;
  }

  const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + (part?.price || 0), 0);

  return (
    <div className="pc-builder-container">
      <h2>🛠️ Asistente de Armado de PC</h2>
      <p className="builder-subtitle">Selecciona tus componentes compatibles en tiempo real.</p>

      <div className="compatibility-alerts">
        {!socketMatch && (
          <div className="alert error">
            ⚠️ <strong>Incompatibilidad de Socket:</strong> El procesador ({selectedCpu?.socket}) no coincide con el socket de la Placa Madre ({selectedMotherboard?.socket}).
          </div>
        )}
        {!ramMatch && (
          <div className="alert error">
            ⚠️ <strong>Incompatibilidad de RAM:</strong> La Placa Madre requiere memoria tipo {selectedMotherboard?.ramType}, pero seleccionaste una RAM {selectedRam?.ramType}.
          </div>
        )}
        {selectedPsu && !psuSufficient && (
            <div className="alert warning">
              ⚡ <strong>Advertencia de Energía:</strong> La fuente seleccionada ({selectedPsu?.wattage}W) podría quedarse corta para los requerimientos del sistema.
            </div>
        )}
        {socketMatch && ramMatch && psuSufficient && Object.keys(selectedParts).length > 0 && (
          <div className="alert success">
            ✅ ¡Todos los componentes seleccionados son compatibles hasta el momento!
          </div>
        )}
      </div>

      <div className="builder-grid">
        <div className="categories-selection">
          {safeCategories.map((category, index) => {
            if (!category || typeof category.name !== 'string') return null;
            const currentSelected = selectedParts[category.name];
            const productsList = Array.isArray(category.products) ? category.products.filter(Boolean) : [];

            return (
              <div key={category.id || index} className="category-slot-card">
                <h3>{category.name}</h3>
                
                {currentSelected ? (
                  <div className="selected-item-info">
                    <span className="item-name">📌 {currentSelected.name}</span>
                    <span className="item-price">${currentSelected.price} USD</span>
                    <button 
                      className="btn-remove" 
                      onClick={() => handleRemovePart(category.name)}
                    >
                      Cambiar / Quitar
                    </button>
                  </div>
                ) : (
                  <div className="select-dropdown-container">
                    <select 
                      defaultValue=""
                      onChange={(e) => {
                        const prodId = e.target.value;
                        if (!prodId) {
                          handleRemovePart(category.name);
                          return;
                        }
                        // Usar comparación flexible para evitar problemas de tipos (string vs number)
                        const product = productsList.find(p => p && String(p.id) === String(prodId));
                        if (product) {
                          handleSelectPart(category.name, product);
                        }
                      }}
                    >
                      <option value="" disabled>-- Selecciona un componente --</option>
                      {productsList.map((product, pIndex) => {
                        if (!product || product.id === undefined) return null;
                        return (
                          <option key={product.id || pIndex} value={product.id}>
                            {product.name} (${product.price} USD) {product.socket ? `[Socket: ${product.socket}]` : ''} {product.ramType ? `[${product.ramType}]` : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="builder-summary">
          <h3>📋 Resumen de tu PC</h3>
          <ul className="summary-list">
            {Object.keys(selectedParts).length === 0 ? (
              <p className="empty-summary">Aún no has seleccionado ningún componente.</p>
            ) : (
              Object.entries(selectedParts).map(([catName, part]) => {
                if (!part) return null;
                return (
                  <li key={catName} className="summary-item">
                    <span><strong>{catName}:</strong> {part.name}</span>
                    <span>${part.price} USD</span>
                  </li>
                );
              })
            )}
          </ul>

          <div className="summary-total">
            <h3>Total Estimado:</h3>
            <span className="total-price">${totalPrice} USD</span>
          </div>

          <button 
            className="btn-finish-build"
            disabled={!socketMatch || !ramMatch || Object.keys(selectedParts).length === 0}
          >
            Finalizar y Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
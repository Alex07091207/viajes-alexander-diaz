import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Destinos from './Destinos';
import DetalleDestino from './DetalleDestino';
import './App.css';

function Inicio() {
  return (
    <section className="hero">
      <h2>Planifica tu próximo viaje en un solo lugar</h2>
      <p>
        Explora nuestros destinos internacionales, descubre sus actividades más populares
        y revisa en tiempo real los vuelos y hoteles disponibles.
      </p>
      <Link to="/destinos" className="btn-primario">
        Explorar Destinos
      </Link>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <Link to="/" className="logo">
            ✈️ Agencia Viajes Mundo
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/destinos">Destinos</Link>
          </nav>
        </header>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/destinos" element={<Destinos />} />
            <Route path="/destinos/:destinoId" element={<DetalleDestino />} />
            <Route
              path="*"
              element={
                <div className="mensaje-estado">
                  <p>Página no encontrada.</p>
                  <Link to="/destinos" className="btn-secundario">
                    Volver a destinos
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
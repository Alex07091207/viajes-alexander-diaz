import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/destinos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudieron cargar los destinos.');
        }
        return res.json();
      })
      .then((data) => {
        setDestinos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="mensaje-estado">Cargando destinos disponibles...</p>;
  if (error) return <p className="mensaje-error">Error: {error}</p>;

  return (
    <section>
      <div className="encabezado-seccion">
        <h2>Destinos Disponibles</h2>
        <span className="badge-api badge-rest">API REST</span>
      </div>

      <div className="grid-destinos">
        {destinos.map((destino) => (
          <article key={destino.id} className="card-destino">
            <div className="card-header">
              <h3>{destino.nombre}</h3>
              <span className="pais">{destino.pais}</span>
            </div>
            <p className="descripcion">{destino.descripcion}</p>

            <h4>Actividades populares:</h4>
            <ul className="lista-actividades">
              {destino.actividadesPopulares.map((actividad, idx) => (
                <li key={idx}>{actividad}</li>
              ))}
            </ul>

            <Link to={`/destinos/${destino.id}`} className="btn-primario">
              Ver vuelos y hoteles
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Destinos;
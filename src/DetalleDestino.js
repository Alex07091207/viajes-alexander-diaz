import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: String!) {
    opcionesViaje(destinoId: $destinoId) {
      nombreDestino
      vuelos {
        id
        aerolinea
        origen
        fechaSalida
        fechaRegreso
        precio
        disponible
      }
      hoteles {
        id
        nombre
        estrellas
        fechasDisponibles
        precioPorNoche
        disponible
      }
    }
  }
`;

function DetalleDestino() {
  const { destinoId } = useParams();
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);

  const { loading, error, data } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId },
  });

  if (loading) {
    return <p className="mensaje-estado">Consultando vuelos y hoteles disponibles...</p>;
  }

  if (error) {
    return (
      <div className="mensaje-error">
        <p>Error: {error.message}</p>
        <Link to="/destinos" className="btn-secundario">
          Volver a destinos
        </Link>
      </div>
    );
  }

  const { nombreDestino, vuelos, hoteles } = data.opcionesViaje;

  return (
    <section>
      <Link to="/destinos" className="link-volver">
        ← Volver a todos los destinos
      </Link>

      <div className="encabezado-seccion">
        <h2>Opciones de viaje para {nombreDestino}</h2>
        <span className="badge-api badge-graphql">API GraphQL</span>
      </div>

      {/* Sección de Vuelos */}
      <div className="bloque-opciones">
        <h3>✈️ Vuelos disponibles</h3>
        <div className="grid-opciones">
          {vuelos.map((vuelo) => {
            const seleccionado = vueloSeleccionado?.id === vuelo.id;
            return (
              <div
                key={vuelo.id}
                className={`card-opcion ${seleccionado ? 'seleccionada' : ''} ${
                  !vuelo.disponible ? 'agotada' : ''
                }`}
              >
                <div className="opcion-top">
                  <strong>{vuelo.aerolinea}</strong>
                  <span className={vuelo.disponible ? 'estado-ok' : 'estado-no'}>
                    {vuelo.disponible ? 'Disponible' : 'Agotado'}
                  </span>
                </div>
                <p>Origen: {vuelo.origen}</p>
                <p>Salida: {vuelo.fechaSalida}</p>
                <p>Regreso: {vuelo.fechaRegreso}</p>
                <p className="precio">USD ${vuelo.precio}</p>
                <button
                  type="button"
                  disabled={!vuelo.disponible}
                  onClick={() => setVueloSeleccionado(vuelo)}
                  className="btn-seleccionar"
                >
                  {seleccionado ? 'Vuelo seleccionado ✓' : 'Seleccionar vuelo'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección de Hoteles */}
      <div className="bloque-opciones">
        <h3>🏨 Hoteles disponibles</h3>
        <div className="grid-opciones">
          {hoteles.map((hotel) => {
            const seleccionado = hotelSeleccionado?.id === hotel.id;
            return (
              <div
                key={hotel.id}
                className={`card-opcion ${seleccionado ? 'seleccionada' : ''} ${
                  !hotel.disponible ? 'agotada' : ''
                }`}
              >
                <div className="opcion-top">
                  <strong>{hotel.nombre}</strong>
                  <span className={hotel.disponible ? 'estado-ok' : 'estado-no'}>
                    {hotel.disponible ? 'Disponible' : 'Sin cupos'}
                  </span>
                </div>
                <p>Categoría: {'★'.repeat(hotel.estrellas)}</p>
                <p>Fechas: {hotel.fechasDisponibles}</p>
                <p className="precio">USD ${hotel.precioPorNoche} / noche</p>
                <button
                  type="button"
                  disabled={!hotel.disponible}
                  onClick={() => setHotelSeleccionado(hotel)}
                  className="btn-seleccionar"
                >
                  {seleccionado ? 'Hotel seleccionado ✓' : 'Seleccionar hotel'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen interactivo del viaje */}
      {(vueloSeleccionado || hotelSeleccionado) && (
        <aside className="resumen-viaje">
          <h3>Resumen de tu planificación</h3>
          <p>
            <strong>Vuelo:</strong>{' '}
            {vueloSeleccionado
              ? `${vueloSeleccionado.aerolinea} (${vueloSeleccionado.fechaSalida} al ${vueloSeleccionado.fechaRegreso}) — USD $${vueloSeleccionado.precio}`
              : 'Aún no seleccionado'}
          </p>
          <p>
            <strong>Hotel:</strong>{' '}
            {hotelSeleccionado
              ? `${hotelSeleccionado.nombre} — USD $${hotelSeleccionado.precioPorNoche} por noche`
              : 'Aún no seleccionado'}
          </p>
        </aside>
      )}
    </section>
  );
}

export default DetalleDestino;
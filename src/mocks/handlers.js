import { graphql, http, HttpResponse, delay } from 'msw';

const destinos = [
  {
    id: 'tokio',
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópolis vibrante que mezcla tecnología de punta y templos milenarios.',
    actividadesPopulares: [
      'Cruce de Shibuya y mirador Shibuya Sky',
      'Visita al Templo Senso-ji en Asakusa',
      'Tour gastronómico por el mercado Tsukiji',
    ],
  },
  {
    id: 'paris',
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad de la luz, famosa por su arte, arquitectura y gastronomía.',
    actividadesPopulares: [
      'Subida a la Torre Eiffel al atardecer',
      'Recorrido por el Museo del Louvre',
      'Paseo en barco por el río Sena',
    ],
  },
  {
    id: 'cusco',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Capital histórica del Imperio Inca y puerta de entrada a Machu Picchu.',
    actividadesPopulares: [
      'Excursión a la ciudadela de Machu Picchu',
      'Recorrido por el Valle Sagrado de los Incas',
      'Caminata a la Montaña de 7 Colores',
    ],
  },
  {
    id: 'rio',
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    descripcion: 'Playas icónicas, música en vivo y paisajes tropicales inolvidables.',
    actividadesPopulares: [
      'Visita al Cristo Redentor en el Corcovado',
      'Teleférico al Pan de Azúcar',
      'Tarde en las playas de Copacabana e Ipanema',
    ],
  },
];

const opcionesPorDestino = {
  tokio: {
    nombreDestino: 'Tokio, Japón',
    vuelos: [
      {
        id: 'v-tok-1',
        aerolinea: 'LATAM / JAL',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-10',
        fechaRegreso: '2026-12-22',
        precio: 1450,
        disponible: true,
      },
      {
        id: 'v-tok-2',
        aerolinea: 'Air Canada',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-14',
        fechaRegreso: '2026-12-28',
        precio: 1320,
        disponible: true,
      },
      {
        id: 'v-tok-3',
        aerolinea: 'ANA Airlines',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-05',
        fechaRegreso: '2026-12-15',
        precio: 1580,
        disponible: false,
      },
    ],
    hoteles: [
      {
        id: 'h-tok-1',
        nombre: 'Shinjuku Granbell Hotel',
        estrellas: 4,
        fechasDisponibles: '10 Dic - 22 Dic 2026',
        precioPorNoche: 140,
        disponible: true,
      },
      {
        id: 'h-tok-2',
        nombre: 'Hotel Gracery Asakusa',
        estrellas: 4,
        fechasDisponibles: '12 Dic - 26 Dic 2026',
        precioPorNoche: 125,
        disponible: true,
      },
      {
        id: 'h-tok-3',
        nombre: 'Park Hyatt Tokyo',
        estrellas: 5,
        fechasDisponibles: '10 Dic - 20 Dic 2026',
        precioPorNoche: 480,
        disponible: false,
      },
    ],
  },
  paris: {
    nombreDestino: 'París, Francia',
    vuelos: [
      {
        id: 'v-par-1',
        aerolinea: 'Air France',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-08',
        fechaRegreso: '2026-12-18',
        precio: 1180,
        disponible: true,
      },
      {
        id: 'v-par-2',
        aerolinea: 'Iberia',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-12',
        fechaRegreso: '2026-12-23',
        precio: 1090,
        disponible: true,
      },
    ],
    hoteles: [
      {
        id: 'h-par-1',
        nombre: 'Hôtel Le Littré',
        estrellas: 4,
        fechasDisponibles: '08 Dic - 18 Dic 2026',
        precioPorNoche: 210,
        disponible: true,
      },
      {
        id: 'h-par-2',
        nombre: 'Ibis Paris Tour Eiffel',
        estrellas: 3,
        fechasDisponibles: '08 Dic - 23 Dic 2026',
        precioPorNoche: 135,
        disponible: true,
      },
    ],
  },
  cusco: {
    nombreDestino: 'Cusco, Perú',
    vuelos: [
      {
        id: 'v-cus-1',
        aerolinea: 'LATAM',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-04',
        fechaRegreso: '2026-12-10',
        precio: 340,
        disponible: true,
      },
      {
        id: 'v-cus-2',
        aerolinea: 'SKY Airline',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-06',
        fechaRegreso: '2026-12-12',
        precio: 295,
        disponible: false,
      },
    ],
    hoteles: [
      {
        id: 'h-cus-1',
        nombre: 'Palacio del Inka',
        estrellas: 5,
        fechasDisponibles: '04 Dic - 10 Dic 2026',
        precioPorNoche: 230,
        disponible: true,
      },
      {
        id: 'h-cus-2',
        nombre: 'Tierra Viva Cusco Centro',
        estrellas: 3,
        fechasDisponibles: '04 Dic - 12 Dic 2026',
        precioPorNoche: 85,
        disponible: true,
      },
    ],
  },
  rio: {
    nombreDestino: 'Río de Janeiro, Brasil',
    vuelos: [
      {
        id: 'v-rio-1',
        aerolinea: 'JetSMART',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-15',
        fechaRegreso: '2026-12-22',
        precio: 310,
        disponible: true,
      },
      {
        id: 'v-rio-2',
        aerolinea: 'GOL Linhas Aéreas',
        origen: 'Santiago (SCL)',
        fechaSalida: '2026-12-16',
        fechaRegreso: '2026-12-24',
        precio: 355,
        disponible: true,
      },
    ],
    hoteles: [
      {
        id: 'h-rio-1',
        nombre: 'Miramar by Windsor Copacabana',
        estrellas: 5,
        fechasDisponibles: '15 Dic - 24 Dic 2026',
        precioPorNoche: 195,
        disponible: true,
      },
      {
        id: 'h-rio-2',
        nombre: 'Arena Ipanema Hotel',
        estrellas: 4,
        fechasDisponibles: '15 Dic - 22 Dic 2026',
        precioPorNoche: 145,
        disponible: false,
      },
    ],
  },
};

export const handlers = [
  // 1. REST handler: lista los destinos disponibles con país y actividades
  http.get('/api/destinos', async () => {
    await delay(600);
    return HttpResponse.json(destinos);
  }),

  // 2. GraphQL handler: consulta vuelos y hoteles de un destino específico
  graphql.query('GetOpcionesViaje', async ({ variables }) => {
    const { destinoId } = variables;
    await delay(800);

    const opcionesViaje = opcionesPorDestino[destinoId];

    if (!opcionesViaje) {
      return HttpResponse.json({
        errors: [
          { message: `No se encontraron vuelos ni hoteles para el destino "${destinoId}".` },
        ],
      });
    }

    return HttpResponse.json({
      data: { opcionesViaje },
    });
  }),
];
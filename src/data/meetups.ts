export interface MeetupPhoto {
  src: string;
  alt: string;
}

export interface Meetup {
  id: string;
  kicker: string;
  title: string;
  date: string;
  dateLabel: string;
  place: string;
  text: string;
  photos: MeetupPhoto[];
  credit?: string;
  logo?: {
    src: string;
    alt: string;
  };
}

export const meetups: Meetup[] = [
  {
    id: 'grok-bot-corrientes-2026',
    kicker: '16 de septiembre de 2026',
    title: 'Grok Bot Meetup Corrientes',
    date: '2026-09-16',
    dateLabel: '16 de septiembre de 2026',
    place: 'Corrientes',
    text: 'La primera Grok Bot Meetup de Corrientes. Workshop de Grok Bot junto a Tobias Insaurralde.',
    logo: {
      src: '/brands/spacexai-wordmark-white.png',
      alt: 'SpaceX AI',
    },
    photos: [],
  },
  {
    id: 'cursor-resistencia-2025',
    kicker: '10 de diciembre de 2025',
    title: 'Cursor Meetup Resistencia',
    date: '2025-12-10',
    dateLabel: '10 de diciembre de 2025',
    place: 'Resistencia',
    text: 'La primera Cursor Meetup en Resistencia. Más de 85 personas escuchando a Juan Rezzio contar cómo es trabajar adentro de Cursor, y al Ing. Agustín Gómez con una demo en vivo de buenas prácticas en desarrollo con IA. La pizza funcionó. La impresora de tickets, también.',
    photos: [
      {
        src: '/meetup/cursor/01-sala.jpg',
        alt: 'Sala llena mirando a Juan Rezzio en videollamada durante la Cursor Meetup Resistencia',
      },
      {
        src: '/meetup/cursor/02-ticket.jpg',
        alt: 'Ticket impreso: Cursor Meetup Resistencia, 10 de diciembre de 2025',
      },
      {
        src: '/meetup/cursor/03-pizza.jpg',
        alt: 'Pizzas y vasos sobre la mesa después de la Cursor Meetup',
      },
      {
        src: '/meetup/cursor/04-orga.jpg',
        alt: 'El equipo que organizó la Cursor Meetup Resistencia',
      },
    ],
    credit: 'Organizada con Alejo Rojas y Lucas Kalchichen. Gracias a Ben por hacerlo posible.',
  },
];

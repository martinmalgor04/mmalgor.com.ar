/** Fotos y videos viven en el CDN (R2), no en el repo. */
import { fecha } from '../lib/dates';

const CDN = 'https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev/mmalgor/meetups';
const spacexLogo = {
  src: '/brands/spacexai-wordmark-white.png',
  alt: 'SpaceX AI',
} as const;

export interface MeetupPhoto {
  src: string;
  alt: string;
}

export interface MeetupVideo {
  src: string;
  poster: string;
  /** Qué se ve, para quien no puede reproducirlo. */
  label: string;
}

export interface Meetup {
  id: string;
  title: string;
  date: string;
  dateLabel: string;
  place: string;
  text: string;
  photos: MeetupPhoto[];
  video?: MeetupVideo;
  credit?: string;
  logo?: {
    src: string;
    alt: string;
  };
}

export const meetups: Meetup[] = [
  {
    id: 'grok-bot-corrientes-2026',
    title: 'Grok Bot Meetup Corrientes',
    date: '2026-09-16',
    dateLabel: fecha('2026-09-16'),
    place: 'Corrientes',
    text: 'La primera Grok Bot Meetup de Corrientes. Workshop con Tobías Insaurralde: Grok Bot Galaxy, cómo pasar un agente a producción, y un panel de preguntas. El equipo de Tero App contó cómo construyen Tero, y los de Fondare App hicieron lo mismo. Cerramos con pizza.',
    logo: spacexLogo,
    photos: [
      {
        src: `${CDN}/grok-bot-2026/03-sala.jpg`,
        alt: 'Sala llena en la Grok Bot Meetup de Corrientes, con una charla sobre pasar un agente a producción',
      },
      {
        src: `${CDN}/grok-bot-2026/01-apertura.jpg`,
        alt: 'Apertura de la Grok Bot Meetup con la presentación de Grok Bot Galaxy en pantalla',
      },
      {
        src: `${CDN}/grok-bot-2026/02-agentes.jpg`,
        alt: 'Charla sobre las dificultades de los agentes, con el público de espaldas mirando la pantalla',
      },
      {
        src: `${CDN}/grok-bot-2026/04-panel.jpg`,
        alt: 'Dos oradores respondiendo preguntas del público en la Grok Bot Meetup',
      },
      {
        src: `${CDN}/grok-bot-2026/05-pizza.jpg`,
        alt: 'Pizzas recién salidas del horno al cierre de la Grok Bot Meetup',
      },
    ],
    video: {
      src: `${CDN}/grok-bot-2026/grok-bot-meetup.mp4`,
      poster: `${CDN}/grok-bot-2026/grok-bot-meetup-poster.jpg`,
      label: 'Un rato del workshop de Grok Bot, en Corrientes.',
    },
    credit: 'Organizada junto con Tobías.',
  },
  {
    id: 'cursor-resistencia-2025',
    title: 'Cursor Meetup Resistencia',
    date: '2025-12-10',
    dateLabel: fecha('2025-12-10'),
    place: 'Resistencia',
    text: 'La primera Cursor Meetup en Resistencia. Más de 85 personas escuchando a Juan Rezzio contar cómo es trabajar adentro de Cursor, y al Ing. Agustín Gómez con una demo en vivo de buenas prácticas en desarrollo con IA. La pizza funcionó. La impresora de tickets, también.',
    logo: spacexLogo,
    photos: [
      {
        src: `${CDN}/cursor-2025/01-sala.jpg`,
        alt: 'Sala llena mirando a Juan Rezzio en videollamada durante la Cursor Meetup Resistencia',
      },
      {
        src: `${CDN}/cursor-2025/02-ticket.jpg`,
        alt: 'Ticket impreso: Cursor Meetup Resistencia, 10 de diciembre de 2025',
      },
      {
        src: `${CDN}/cursor-2025/03-pizza.jpg`,
        alt: 'Pizzas y vasos sobre la mesa después de la Cursor Meetup',
      },
      {
        src: `${CDN}/cursor-2025/04-orga.jpg`,
        alt: 'El equipo que organizó la Cursor Meetup Resistencia',
      },
    ],
    credit: 'Organizada con Alejo Rojas y Lucas Kalchichen. Gracias a Ben por hacerlo posible.',
  },
];

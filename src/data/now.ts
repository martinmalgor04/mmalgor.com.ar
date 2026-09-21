/** /now — lo que está pasando ahora, con fecha. No es un CV. */
import { fecha } from '../lib/dates';
import { profile } from './profile';

const date = '2026-09-16';
const updated = '2026-09-21';

export const now = {
  /** Fecha de lo que cuenta, para el feed. */
  date,
  dateLabel: fecha(date),
  updated,
  updatedLabel: fecha(updated),
  title: 'Grok Bot Meetup en Corrientes.',
  excerpt:
    'El 16 de septiembre hicimos la primera Grok Bot Meetup de Corrientes: más de 100 personas en el Parque Tecnológico de la UNNE.',
  paragraphs: [
    'El 16 de septiembre de 2026 hicimos la primera Grok Bot Meetup de Corrientes, junto con Tobías. Dimos un workshop de Grok Bot y cómo pasar un agente a producción: cómo funciona, y cómo cambia la forma de trabajar con IA.',
    'Participaron los chicos de Tero App, que contaron cómo construyen Tero, y los de Fondare App hicieron lo mismo. Hablaron de armar producto en esta era: elegir el scope que el cliente necesita, sin construir de más.',
    'Fuimos más de 100 personas en el Parque Tecnológico de la UNNE. Aportar a la comunidad de la región suma: no solo armarla, sostenerla.',
    `En la UTN voy por ${profile.utn.yearLabel} de Ingeniería en Sistemas, en la Facultad Regional Resistencia.`,
    'En diciembre de 2025 habíamos hecho la primera Cursor Meetup en Resistencia.',
  ],
} as const;

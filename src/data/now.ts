/** /now — lo que está pasando ahora, con fecha. No es un CV. */
import { fecha } from '../lib/dates';
import { profile } from './profile';

const updated = '2026-09-20';

export const now = {
  updated,
  updatedLabel: fecha(updated),
  excerpt:
    'El 16 de septiembre de 2026 hicimos la primera Grok Bot Meetup de Corrientes. En SyS estoy armando el área comercial; en la UTN voy por cuarto año.',
  paragraphs: [
    'El 16 de septiembre de 2026 hicimos la primera Grok Bot Meetup de Corrientes, con Tobías Insaurralde. Dimos un workshop de Grok Bot.',
    'En SyS estoy armando el área comercial.',
    `En la UTN voy por ${profile.utn.yearLabel} de Ingeniería en Sistemas, en la Facultad Regional Resistencia.`,
    'En diciembre de 2025 habíamos hecho la primera Cursor Meetup en Resistencia.',
  ],
} as const;

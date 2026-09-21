/** /now — lo que está pasando ahora, con fecha. No es un CV. */
import { fecha } from '../lib/dates';
import { profile } from './profile';

const updated = '2026-09-21';

export const now = {
  updated,
  updatedLabel: fecha(updated),
  title: 'Grok Bot Meetup en Corrientes.',
  excerpt:
    'El 16 de septiembre hicimos la primera, junto con Tobías. Workshop, Tero App, Fondare App, y pizza.',
  paragraphs: [
    'El 16 de septiembre de 2026 hicimos la primera Grok Bot Meetup de Corrientes, junto con Tobías. Workshop de Grok Bot Galaxy y cómo pasar un agente a producción. El equipo de Tero App contó cómo construyen Tero, y los de Fondare App hicieron lo mismo.',
    'En SyS estoy armando el área comercial.',
    `En la UTN voy por ${profile.utn.yearLabel} de Ingeniería en Sistemas, en la Facultad Regional Resistencia.`,
    'En diciembre de 2025 habíamos hecho la primera Cursor Meetup en Resistencia.',
  ],
} as const;

import { fecha } from '../lib/dates';
import { profile } from './profile';

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  paragraphs: string[];
}

const date = '2026-09-20';

export const notes: Note[] = [
  {
    slug: 'profesionalizar-sys',
    title: 'Estoy profesionalizando SyS',
    description:
      'Entré a los 16, en 2019. Ahora tomo las decisiones pesadas: ordenar procesos, automatizar lo que se repite y armar el área comercial.',
    date,
    dateLabel: fecha(date),
    paragraphs: [
      `Servicios y Sistemas la fundó mi papá, Daniel Malgor, en Corrientes, en ${profile.sys.founded}. Yo entré a los 16, en ${profile.joinedYear}. Empresa familiar, segunda generación.`,
      'Durante años no tomaba las decisiones pesadas: precios, a quién contratar, qué dejar de hacer. Ahora sí. Lo primero que ordené fue lo que el equipo hacía a mano cada mes: reportes, seguimientos, recortes que se repetían igual. Con Tango donde alcanza y con una app a medida donde no.',
      'El área comercial, que no existía como área, la estoy armando ahora. Soy Técnico Certificado Tango Elite: el sello es personal. El de SyS es Centro de Ventas y Servicios Certificado.',
      'Lo que veo en las PYMES del NEA lo llevo al aula de la UTN, y lo que estudio lo pruebo acá.',
    ],
  },
];

export const noteBySlug: Record<string, Note> = Object.fromEntries(notes.map((n) => [n.slug, n]));

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

const date = '2026-09-21';

export const notes: Note[] = [
  {
    slug: 'profesionalizar-sys',
    title: 'Tranquilidad operativa.',
    description:
      'Entré a los 16. Pasé por todos los puestos. Ahora pulo procesos y armo el área comercial de SyS.',
    date,
    dateLabel: fecha(date),
    paragraphs: [
      `Servicios y Sistemas la fundó mi papá, Daniel Malgor, en Corrientes, en ${profile.sys.founded}. Yo entré a los 16, en ${profile.joinedYear}. Empresa familiar: hoy soy la segunda generación.`,
      'Pasé por todos los huecos: técnico, vendedor, soporte, y alguna vez administrativo. Esa recorrida me sirvió para entender cómo funciona SyS y cómo funcionan las demás PYMEs de la región. Sistematizar procesos se hace desde adentro.',
      'Hoy me dedico a mejorarlos y pulirlos. El área comercial, que no existía como área, la estoy armando ahora: para que SyS se dé más a conocer. Con más de mil implementaciones Tango, esa parte no puede quedar atrás.',
      'Las ideas son nuevas. Los valores, no. A una PYME hay que darle a alguien a quien confiarle los sistemas y la infraestructura. Tranquilidad operativa.',
    ],
  },
];

export const noteBySlug: Record<string, Note> = Object.fromEntries(notes.map((n) => [n.slug, n]));

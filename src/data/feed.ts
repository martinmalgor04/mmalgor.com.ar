/** Home: un feed. Ahora y notas, lo más nuevo primero. */
import { now } from './now';
import { notes } from './notes';

export interface FeedItem {
  kind: 'Ahora' | 'Nota';
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
  event: string;
}

export const feed: FeedItem[] = [
  {
    kind: 'Ahora' as const,
    date: now.date,
    dateLabel: now.dateLabel,
    title: now.title,
    excerpt: now.excerpt,
    href: '/now',
    cta: 'Seguir leyendo',
    event: 'click-now-home',
  },
  ...notes.map((n) => ({
    kind: 'Nota' as const,
    date: n.date,
    dateLabel: n.dateLabel,
    title: n.title,
    excerpt: n.description,
    href: `/notas/${n.slug}`,
    cta: 'Leer la nota',
    event: 'click-nota-home',
  })),
].sort((a, b) => b.date.localeCompare(a.date));

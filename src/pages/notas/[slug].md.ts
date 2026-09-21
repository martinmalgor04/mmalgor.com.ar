import type { APIRoute } from 'astro';
import { noteBySlug } from '../../data/notes';
import { markdownNote, markdownResponse } from '../../lib/seo';

export function getStaticPaths() {
  return Object.keys(noteBySlug).map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const note = noteBySlug[params.slug ?? ''];
  if (!note) return new Response('Not found', { status: 404 });
  return markdownResponse(markdownNote(note));
};

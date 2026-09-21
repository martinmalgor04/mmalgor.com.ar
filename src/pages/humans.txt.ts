import type { APIRoute } from 'astro';
import { humansTxt } from '../lib/seo';

export const GET: APIRoute = () =>
  new Response(humansTxt().trim() + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

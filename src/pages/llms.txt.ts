import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/seo';

export const GET: APIRoute = () =>
  new Response(llmsTxt().trim() + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

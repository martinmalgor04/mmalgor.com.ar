import type { APIRoute } from 'astro';
import { llmsFullTxt } from '../lib/seo';

export const GET: APIRoute = () =>
  new Response(llmsFullTxt().trim() + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });

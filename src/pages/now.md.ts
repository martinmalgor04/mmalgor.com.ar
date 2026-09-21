import type { APIRoute } from 'astro';
import { markdownNow, markdownResponse } from '../lib/seo';

export const GET: APIRoute = () => markdownResponse(markdownNow());

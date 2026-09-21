import type { APIRoute } from 'astro';
import { markdownLinks, markdownResponse } from '../lib/seo';

export const GET: APIRoute = () => markdownResponse(markdownLinks());

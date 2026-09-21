import type { APIRoute } from 'astro';
import { markdownHome, markdownResponse } from '../lib/seo';

export const GET: APIRoute = () => markdownResponse(markdownHome());

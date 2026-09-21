import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { notes } from '../data/notes';
import { now } from '../data/now';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://mmalgor.com.ar');
  const items = [
    {
      title: now.title,
      href: '/now',
      date: now.date,
      description: now.excerpt,
    },
    ...notes.map((n) => ({
      title: n.title,
      href: `/notas/${n.slug}`,
      date: n.date,
      description: n.description,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (n) => `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${new URL(n.href, origin)}</link>
      <guid>${new URL(n.href, origin)}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description>${escapeXml(n.description)}</description>
    </item>`,
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)}</title>
    <link>${origin}</link>
    <atom:link href="${new URL('rss.xml', origin)}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(profile.seo.description)}</description>
    <language>es-ar</language>
    <managingEditor>${escapeXml(profile.email)} (${escapeXml(profile.name)})</managingEditor>
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

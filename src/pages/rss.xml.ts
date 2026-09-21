import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { notes } from '../data/notes';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://mmalgor.com.ar');
  const items = notes.map(
    (n) => `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${new URL(`/notas/${n.slug}`, origin)}</link>
      <guid>${new URL(`/notas/${n.slug}`, origin)}</guid>
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

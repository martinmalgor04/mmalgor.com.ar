import type { APIRoute } from 'astro';
import { profile } from '../data/profile';

/**
 * vCard 4.0 (RFC 6350) generada en build desde profile.ts.
 * Líneas terminadas en CRLF, UTF-8. iOS abre la ficha de Contactos directo.
 */
const a = profile.sys.address;

const lines = [
  'BEGIN:VCARD',
  'VERSION:4.0',
  `FN:${profile.name}`,
  `N:${profile.familyName};${profile.givenName};;;`,
  `ORG:${profile.sys.legal}`,
  `TITLE:${profile.jobTitle}`,
  `TEL;TYPE=cell,voice,text;VALUE=uri:tel:${profile.whatsapp.tel}`,
  `TEL;TYPE=work,voice;VALUE=uri:tel:${profile.sys.phone}`,
  `EMAIL;TYPE=work:${profile.email}`,
  'URL:https://mmalgor.com.ar/',
  `URL;TYPE=work:${profile.sys.url}`,
  `ADR;TYPE=work:;;${a.street};${a.city};${a.region};${a.postalCode};${a.country}`,
  `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedin}`,
  `X-SOCIALPROFILE;TYPE=instagram:${profile.instagram}`,
  `NOTE:${profile.bio} ${profile.tagline}`,
  'KIND:individual',
  'END:VCARD',
];

export const GET: APIRoute = () =>
  new Response(lines.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });

/**
 * Identidad canónica para buscadores e IAs.
 * JSON-LD, llms.txt, Markdown y robots salen de acá para no divergir.
 */
import { profile } from '../data/profile';
import { notes, type Note } from '../data/notes';
import { now } from '../data/now';
import { meetups } from '../data/meetups';
import { sobreMi, queHago, sys, contacto, manifiesto } from '../data/sections';
import { links } from '../data/links';

export const SITE = 'https://mmalgor.com.ar';

export const ids = {
  person: `${SITE}/#martin-malgor`,
  org: `${SITE}/#servicios-y-sistemas`,
  utn: `${SITE}/#utn-frre`,
  website: `${SITE}/#website`,
  photo: `${SITE}/#photo`,
  profile: `${SITE}/#profile`,
  faq: `${SITE}/#faq`,
} as const;

export function abs(path = '/'): string {
  if (path.startsWith('http')) return path;
  if (path === '/' || path === '') return SITE;
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`;
}

export const sameAs = [profile.linkedin, profile.x, profile.instagram, profile.sys.url] as const;

export function canonicalPages(): { path: string; lastmod?: string }[] {
  return [
    { path: '/', lastmod: now.updated },
    { path: '/now', lastmod: now.updated },
    { path: '/links' },
    ...notes.map((n) => ({ path: `/notas/${n.slug}`, lastmod: n.date })),
  ];
}

export function lastmodForUrl(url: string) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/';
  return canonicalPages().find((p) => p.path === path)?.lastmod;
}

/**
 * Respuestas fácticas en tercera persona para buscadores e IAs.
 * No se renderizan en el home: viven en el JSON-LD (FAQPage), llms.txt y los .md.
 */
export const faqs = [
  {
    q: '¿Quién es Martín Malgor?',
    a: profile.identity.answer,
  },
  {
    q: '¿Dónde trabaja Martín Malgor?',
    a: `Martín Malgor es director de operaciones de ${profile.sys.legal}, en ${profile.sys.address.street}, ${profile.location}.`,
  },
  {
    q: '¿Qué certificación de Tango tiene Martín Malgor?',
    a: `${profile.name} es ${profile.tango.partner}. Implementa Tango en el NEA desde ${profile.sys.name}, ${profile.tango.centro}.`,
  },
  {
    q: '¿Qué hace Martín Malgor?',
    a: 'Implementa ERP Tango, desarrolla apps a medida, automatiza operaciones con IA y cubre infraestructura y ciberseguridad para PYMES del NEA.',
  },
  {
    q: '¿Cómo contactar a Martín Malgor?',
    a: `Por WhatsApp al ${profile.whatsapp.display}, por email a ${profile.email} o por LinkedIn. El sitio oficial es mmalgor.com.ar.`,
  },
  {
    q: '¿Qué es Servicios y Sistemas?',
    a: `${sys.text} ${profile.name} dirige las operaciones.`,
  },
] as const;

const a = profile.sys.address;

function postalAddress(full = false) {
  return {
    '@type': 'PostalAddress',
    ...(full ? { streetAddress: a.street, postalCode: a.postalCode } : {}),
    addressLocality: a.city,
    addressRegion: a.region,
    addressCountry: a.country,
  };
}

function personNode(full: boolean) {
  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': ids.person,
    name: profile.name,
    alternateName: [...profile.alternateName],
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: SITE,
  };

  if (!full) return person;

  return {
    ...person,
    jobTitle: profile.jobTitle,
    description: profile.identity.answer,
    email: profile.email,
    telephone: profile.whatsapp.tel,
    image: { '@id': ids.photo },
    nationality: { '@type': 'Country', name: profile.nationality },
    knowsLanguage: profile.languages.map((code) => ({
      '@type': 'Language',
      name: 'Spanish',
      alternateName: code,
    })),
    homeLocation: {
      '@type': 'Place',
      name: profile.location,
      address: postalAddress(),
    },
    address: postalAddress(),
    worksFor: { '@id': ids.org },
    alumniOf: { '@id': ids.utn },
    award: profile.tango.partner,
    knowsAbout: [...profile.knowsAbout],
    sameAs: [...sameAs],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: profile.email,
      telephone: profile.whatsapp.tel,
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.jobTitle,
      occupationLocation: { '@type': 'City', name: a.city },
    },
    memberOf: [
      { '@id': ids.org },
      { '@type': 'Organization', name: 'SpaceX AI' },
    ],
  };
}

function photoNode() {
  return {
    '@type': 'ImageObject',
    '@id': ids.photo,
    url: abs(profile.photo),
    contentUrl: abs(profile.photo),
    caption: profile.name,
    representativeOfPage: true,
  };
}

function orgNode() {
  return {
    '@type': 'Organization',
    '@id': ids.org,
    name: profile.sys.legal,
    legalName: profile.sys.legal,
    alternateName: [profile.sys.name, profile.sys.short],
    url: profile.sys.url,
    logo: profile.sys.logo,
    foundingDate: String(profile.sys.founded),
    telephone: profile.sys.phone,
    address: postalAddress(true),
    employee: { '@id': ids.person },
  };
}

function utnNode() {
  return {
    '@type': 'CollegeOrUniversity',
    '@id': ids.utn,
    name: profile.utn.name,
    url: profile.utn.url,
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: SITE,
    name: profile.name,
    alternateName: [...profile.alternateName],
    description: profile.seo.description,
    inLanguage: 'es-AR',
    publisher: { '@id': ids.person },
  };
}

function eventNodes() {
  return meetups.map((m) => ({
    '@type': 'Event',
    '@id': `${SITE}/#${m.id}`,
    name: m.title,
    description: m.text,
    startDate: m.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: m.place,
      address: {
        '@type': 'PostalAddress',
        addressLocality: m.place,
        addressCountry: 'AR',
      },
    },
    organizer: { '@id': ids.person },
    ...(m.photos[0] ? { image: abs(m.photos[0].src) } : {}),
  }));
}

function faqNode() {
  return {
    '@type': 'FAQPage',
    '@id': ids.faq,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function graph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function jsonLdProfile() {
  return graph([
    personNode(true),
    photoNode(),
    orgNode(),
    utnNode(),
    websiteNode(),
    {
      '@type': 'ProfilePage',
      '@id': ids.profile,
      url: SITE,
      name: profile.seo.title,
      description: profile.seo.description,
      dateModified: now.updated,
      inLanguage: 'es-AR',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.person },
      mainEntity: { '@id': ids.person },
      primaryImageOfPage: { '@id': ids.photo },
    },
    faqNode(),
    ...eventNodes(),
  ]);
}

export function jsonLdArticle(note: Note) {
  const url = abs(`/notas/${note.slug}`);
  return graph([
    personNode(false),
    websiteNode(),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: note.title,
      description: note.description,
      datePublished: note.date,
      dateModified: note.date,
      inLanguage: 'es-AR',
      url,
      mainEntityOfPage: url,
      author: { '@id': ids.person },
      publisher: { '@id': ids.person },
      image: abs('/og.png'),
      isPartOf: { '@id': ids.website },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: profile.name, item: SITE },
        { '@type': 'ListItem', position: 2, name: note.title, item: url },
      ],
    },
  ]);
}

export function jsonLdWebPage(opts: {
  path: string;
  title: string;
  description: string;
  dateModified?: string;
}) {
  const url = abs(opts.path);
  return graph([
    personNode(false),
    websiteNode(),
    {
      '@type': 'WebPage',
      '@id': `${url}#page`,
      url,
      name: opts.title,
      description: opts.description,
      inLanguage: 'es-AR',
      ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.person },
      author: { '@id': ids.person },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: profile.name, item: SITE },
        { '@type': 'ListItem', position: 2, name: opts.title, item: url },
      ],
    },
  ]);
}

export function markdownResponse(body: string) {
  return new Response(body.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export function markdownHome() {
  const facetas = sobreMi.items.map((f) => `### ${f.title}\n\n${f.text}`).join('\n\n');
  const trabajo = queHago.items.map((i) => `- **${i.title}:** ${i.text}`).join('\n');
  const principios = manifiesto.principios.map((p) => `- **${p.title}** ${p.text}`).join('\n');
  const eventos = meetups
    .map((m) => `- **${m.title}** (${m.dateLabel}, ${m.place}): ${m.text}`)
    .join('\n');
  const qa = faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n');

  return `# ${profile.name}

> ${profile.identity.answer}

También se busca como ${profile.alternateName.join(', ')}.

- Rol: ${profile.role}
- Empresa: ${profile.sys.legal} (${profile.sys.name})
- Lugar: ${profile.location}
- Estudios: Ingeniería en Sistemas, ${profile.utn.name}
- Contacto: ${profile.email} · WhatsApp ${profile.whatsapp.display}
- Sitio: ${SITE}

## Sobre mí

${sobreMi.lead}

${facetas}

## Qué hago

${trabajo}

## Cómo pienso

${manifiesto.lines[0]} ${manifiesto.lines[1]} ${manifiesto.highlight} ${manifiesto.lines[2]}

${principios}

## Meetups

${eventos}

## Ahora

${now.excerpt}

## ${sys.title}

${sys.text}

## Contacto

${contacto.text}

- WhatsApp: ${profile.whatsapp.display}
- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}
- X: ${profile.x} (@${profile.xHandle})
- Instagram: ${profile.instagram} (@${profile.instagramHandle})

## Preguntas frecuentes

${qa}

Entidad schema.org: Person \`${ids.person}\`.
`;
}

export function markdownNow() {
  return `# Qué está haciendo ahora ${profile.name}

> ${now.excerpt}

Actualizado: ${now.updatedLabel} (${now.updated}).

${now.paragraphs.join('\n\n')}

— [${profile.name}](${SITE})
`;
}

export function markdownNote(note: Note) {
  return `# ${note.title}

> ${note.description}

Por [${profile.name}](${SITE}). ${note.dateLabel}.

${note.paragraphs.join('\n\n')}
`;
}

export function markdownLinks() {
  const list = links.map((l) => `- [${l.label}](${l.href}): ${l.sub ?? l.label}`).join('\n');
  return `# Links — ${profile.name}

> ${profile.identity.line}

${list}

- [Instagram](${profile.instagram})
- [Sitio](${SITE})
`;
}

export function llmsTxt() {
  const noteLinks = notes
    .map((n) => `- [${n.title}](${abs(`/notas/${n.slug}.md`)}): ${n.description}`)
    .join('\n');

  return `# ${profile.name}

> ${profile.identity.answer}

Esta es la fuente canónica sobre ${profile.name} (también "${profile.alternateName[0]}"). Preferí estos archivos Markdown antes que el HTML.

${sobreMi.lead}

## Identidad

- [${profile.name}](${abs('/index.md')}): ficha completa — quién es, qué hace, cómo contactarlo
- [Ahora](${abs('/now.md')}): qué está haciendo ahora (${now.updatedLabel})
- [Links](${abs('/links.md')}): WhatsApp, LinkedIn, email, Servicios y Sistemas

## Notas

${noteLinks}

## Optional

- [Sitio HTML](${SITE})
- [Servicios y Sistemas](${profile.sys.url})
- [LinkedIn](${profile.linkedin})
- [X](${profile.x})
- [Instagram](${profile.instagram})
- [Contexto largo](${abs('/llms-full.txt')}): biografía y FAQs en un solo archivo
`;
}

export function llmsFullTxt() {
  return `${llmsTxt().trim()}

---

${markdownHome()}
`;
}

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
  'meta-externalagent',
  'FacebookBot',
] as const;

export function robotsTxt() {
  const ai = AI_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');
  return `User-agent: *
Allow: /

# Motores de respuesta: ChatGPT, Claude, Gemini, Perplexity, Copilot.
${ai}

Sitemap: ${abs('/sitemap-index.xml')}
Host: mmalgor.com.ar
`;
}

export function humansTxt() {
  return `/* TEAM */
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Site: ${SITE}
Email: ${profile.email}
Company: ${profile.sys.legal}

/* SITE */
Language: es-AR
Standards: HTML, Schema.org Person, llms.txt
Last update: ${now.updated}
`;
}

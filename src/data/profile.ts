/**
 * Datos de Martín. Única fuente para el hero, el JSON-LD, la vCard y el footer.
 * Cambiar acá y todo el sitio se actualiza.
 */
export const profile = {
  name: 'Martín Malgor',
  givenName: 'Martín',
  familyName: 'Malgor',
  initials: 'MM',
  /** Búsquedas y IAs suelen omitir la tilde. */
  alternateName: ['Martin Malgor', 'Martín M. Malgor'],
  role: 'Director de operaciones en Servicios y Sistemas',
  jobTitle: 'Director de operaciones',
  tagline: 'Traduzco tecnología a decisiones de negocio.',
  location: 'Corrientes, Argentina',
  nationality: 'Argentina',
  languages: ['es-AR'],
  photo: '/martin-malgor.jpg',
  /** Año en que Martín entra a SyS. No calcular con Date(): solo cambia con un push. */
  joinedYear: 2019,

  /**
   * Respuestas fácticas para buscadores e IAs. El tagline es marca;
   * esto es la ficha: quién, dónde, qué. No es frase de venta.
   */
  identity: {
    line: 'Director de operaciones en Servicios y Sistemas · Técnico Certificado Tango Elite · Embajador de SpaceX AI · Corrientes, Argentina',
    /** El punto medio va adentro de cada span para que no quede «Argentina» sola. */
    parts: [
      'Director de operaciones en Servicios y Sistemas ·',
      'Técnico Certificado Tango Elite ·',
      'Embajador de SpaceX AI ·',
      'Corrientes, Argentina',
    ],
    answer:
      'Martín Malgor es director de operaciones de Servicios y Sistemas en Corrientes, Argentina. Es Técnico Certificado Tango Elite, SpaceX AI Ambassador y cursa 4.º año de Ingeniería en Sistemas en la UTN Facultad Regional Resistencia. Trabaja con PYMES del NEA (Corrientes, Chaco, Formosa y Misiones) en ERP Tango, desarrollo a medida, automatización e infraestructura IT.',
  },

  tango: {
    label: 'Tango Elite',
    /** Certificación de la persona. La empresa es Centro de Ventas y Servicios Certificado. */
    partner: 'Técnico Certificado Tango Elite',
    /** Categoría de SyS como canal de Tango Software. */
    centro: 'Centro de Ventas y Servicios Certificado Tango Software',
    badge: '/brands/tango-elite.webp',
    url: 'https://www.tangosoftware.com.ar/',
  },

  marks: [
    { title: 'Tango Elite', text: 'Primera certificación.' },
    { title: 'Ingeniería en Sistemas', text: 'cuarto año · UTN FRRe' },
    { title: 'SpaceX AI', text: 'Embajador voluntario en el NEA.' },
  ],

  email: 'martin@serviciosysistemas.com.ar',
  instagram: 'https://www.instagram.com/martinmmalgor/',
  instagramHandle: 'martinmmalgor',
  x: 'https://x.com/techconmartin',
  xHandle: 'techconmartin',
  whatsapp: {
    /** Formato wa.me: 54 + 9 + área sin 0 + número sin 15. */
    number: '5493795040635',
    display: '+54 9 379 504 0635',
    tel: '+5493795040635',
    message: 'Hola Martín, te escribo desde mmalgor.com.ar.',
  },
  linkedin: 'https://www.linkedin.com/in/martin-malgor-6b3824186/',
  vcard: '/martin-malgor.vcf',
  calendly: {
    url: 'https://calendly.com/martinmmalgor/30min',
    label: 'Agendar 30 min',
  },

  sys: {
    name: 'Servicios y Sistemas',
    short: 'SyS',
    legal: 'Servicios y Sistemas SRL',
    url: 'https://www.serviciosysistemas.com.ar',
    logo: '/brands/sys-logo.png',
    isologo: '/brands/sys-isologo.png',
    founded: 1993,
    phone: '+54-3794-426022',
    phoneDisplay: '+54 379 442-6022',
    address: {
      street: 'San Martín 1180',
      city: 'Corrientes',
      region: 'Corrientes',
      postalCode: '3400',
      country: 'AR',
    },
  },

  utn: {
    name: 'Universidad Tecnológica Nacional, Facultad Regional Resistencia',
    short: 'UTN FRRe',
    url: 'https://www.frre.utn.edu.ar/',
    year: 4,
    yearLabel: 'cuarto año',
    yearOrdinal: '4.º',
  },

  spacexai: {
    name: 'SpaceX AI',
    url: 'https://x.ai',
  },

  seo: {
    title: 'Martín Malgor — Técnico Certificado Tango Elite, Corrientes',
    description:
      'Director de operaciones en Servicios y Sistemas, Corrientes. Técnico Certificado Tango Elite. ERP Tango, apps a medida y automatización para PYMES del NEA.',
    ogAlt: 'Martín Malgor — Técnico Certificado Tango Elite. Servicios y Sistemas, Corrientes.',
  },

  statsKicker: 'Con SyS, desde 1993',
  stats: [
    { value: 1000, prefix: '+', label: 'implementaciones Tango' },
    { value: 200, prefix: '+', label: 'empresas por año' },
    { value: 4, prefix: '', label: 'provincias del NEA' },
  ],

  knowsAbout: [
    'ERP Tango',
    'Tango Software',
    'Desarrollo a medida',
    'Automatización e inteligencia artificial aplicada',
    'Estrategia IT',
    'Infraestructura IT',
    'Ciberseguridad para PYMES',
    'Desarrollo asistido por IA',
    'Comunidades tech del NEA',
  ],
} as const;

export const whatsappHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`;

export function whatsappTopic(topic: string) {
  return `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(
    `Hola Martín, te escribo desde mmalgor.com.ar. Quiero hablar de ${topic}.`,
  )}`;
}

export function formatStat(prefix: string, value: number) {
  return `${prefix}${value.toLocaleString('es-AR')}`;
}

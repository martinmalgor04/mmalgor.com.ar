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
  bio: 'Segunda generación en Servicios y Sistemas. Técnico Certificado Tango Elite. Estudio Ingeniería en Sistemas.',
  location: 'Corrientes, Argentina',
  nationality: 'Argentina',
  languages: ['es-AR'],
  photo: '/martin-malgor.jpg',

  /**
   * Respuestas fácticas para buscadores e IAs. El tagline es marca;
   * esto es la ficha: quién, dónde, qué.
   */
  identity: {
    line: 'Director de operaciones en Servicios y Sistemas · Técnico Certificado Tango Elite · Corrientes, Argentina',
    answer:
      'Martín Malgor es director de operaciones de Servicios y Sistemas en Corrientes, Argentina. Es Técnico Certificado Tango Elite, SpaceX AI Ambassador y cursa 4.º año de Ingeniería en Sistemas en la UTN Facultad Regional Resistencia. Trabaja con PYMES del NEA en ERP Tango, desarrollo a medida, automatización e infraestructura IT.',
  },

  tango: {
    label: 'Tango Elite',
    /** Certificación de la persona. La empresa es Centro de Ventas y Servicios Certificado. */
    partner: 'Técnico Certificado Tango Elite',
    /** Categoría de SyS como canal de Tango Software. */
    centro: 'Centro de Ventas y Servicios Certificado Tango Software',
    badge: 'https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev/partners/tango-elite.png',
  },

  marks: [
    { title: 'Tango Elite', text: 'Técnico Certificado, por primera vez.' },
    { title: 'Ingeniería en Sistemas', text: '4to año · UTN FRRe' },
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

  sys: {
    name: 'Servicios y Sistemas',
    short: 'SyS',
    legal: 'Servicios y Sistemas SRL',
    url: 'https://www.serviciosysistemas.com.ar',
    logo: 'https://serviciosysistemas.com.ar/assets/img/logo/sys_logo_w.png',
    isologo: 'https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev/LOGOS/isologo_white.png',
    founded: 1993,
    phone: '+54-3794-426022',
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
    url: 'https://www.frre.utn.edu.ar/',
  },

  seo: {
    title: 'Martín Malgor — Técnico Certificado Tango Elite, Corrientes',
    description:
      'Martín Malgor (Martin Malgor) dirige operaciones en Servicios y Sistemas, Corrientes. Técnico Certificado Tango Elite, SpaceX AI Ambassador y estudiante de Ingeniería en Sistemas en la UTN FRRe. ERP, apps a medida y automatización para PYMES del NEA.',
    ogAlt: 'Martín Malgor — Técnico Certificado Tango Elite. Servicios y Sistemas, Corrientes.',
  },

  stats: [
    { value: '+1000', label: 'implementaciones Tango' },
    { value: '+200', label: 'empresas por año' },
    { value: '4', label: 'provincias del NEA' },
  ],

  knowsAbout: [
    'ERP Tango',
    'Tango Software',
    'Desarrollo a medida',
    'Automatización e inteligencia artificial aplicada',
    'Estrategia IT',
    'Infraestructura IT',
    'Ciberseguridad para PYMES',
    'SpaceX AI',
    'Cursor',
    'Grok Bot',
  ],
} as const;

export const whatsappHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`;

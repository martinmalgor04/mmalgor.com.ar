/**
 * Datos de Martín. Única fuente para el hero, el JSON-LD, la vCard y el footer.
 * Cambiar acá y todo el sitio se actualiza.
 */
export const profile = {
  name: 'Martín Malgor',
  givenName: 'Martín',
  familyName: 'Malgor',
  initials: 'MM',
  role: 'Director de operaciones en Servicios y Sistemas',
  jobTitle: 'Director de operaciones',
  tagline: 'Traduzco tecnología a decisiones de negocio.',
  bio: 'Segunda generación en Servicios y Sistemas. Partner Elite de Tango. Estudio Ingeniería en Sistemas.',
  location: 'Corrientes, Argentina',

  tango: {
    label: 'Tango Elite',
    partner: 'Partner Elite de Tango Software',
    badge: 'https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev/partners/tango-elite.png',
  },

  marks: [
    { title: 'Tango Elite', text: 'Técnico Certificado, por primera vez.' },
    { title: 'Ingeniería en Sistemas', text: '4to año · UTN FRRe' },
  ],

  email: 'martin@serviciosysistemas.com.ar',
  instagram: 'https://www.instagram.com/martinmmalgor/',
  instagramHandle: 'martinmmalgor',
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
    title: 'Martín Malgor — Partner Elite de Tango',
    description:
      'Partner Elite de Tango. Dirijo operaciones en Servicios y Sistemas, Corrientes. ERP, apps a medida y automatización para PYMES del NEA.',
    ogAlt: 'Martín Malgor — Partner Elite de Tango. Servicios y Sistemas.',
  },

  stats: [
    { value: '+1000', label: 'implementaciones Tango' },
    { value: '+200', label: 'empresas por año' },
    { value: '4', label: 'provincias del NEA' },
  ],

  knowsAbout: [
    'ERP Tango',
    'Desarrollo a medida',
    'Automatización e inteligencia artificial aplicada',
    'Estrategia IT',
    'Infraestructura IT',
  ],
} as const;

export const whatsappHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`;

/**
 * Datos de Martín. Única fuente para el hero, el JSON-LD, la vCard y el footer.
 * Cambiar acá y todo el sitio se actualiza.
 */
export const profile = {
  name: 'Martín Malgor',
  givenName: 'Martín',
  familyName: 'Malgor',
  initials: 'MM',
  role: 'Director de Servicios & Sistemas',
  jobTitle: 'Director',
  tagline: 'Traduzco tecnología a decisiones de negocio.',
  bio: 'Director de Servicios & Sistemas · Corrientes, Argentina',
  location: 'Corrientes, Argentina',

  email: 'martin@serviciosysistemas.com.ar',
  whatsapp: {
    /** Formato wa.me: 54 + 9 + área sin 0 + número sin 15. */
    number: '5493795040635',
    display: '+54 9 379 504 0635',
    tel: '+5493795040635',
    message: 'Hola Martín, te escribo desde mmalgor.com.ar.',
  },
  linkedin: 'https://www.linkedin.com/in/martin-malgor-6b3824186/',

  sys: {
    name: 'Servicios & Sistemas',
    short: 'SyS',
    legal: 'Servicios y Sistemas SRL',
    url: 'https://www.serviciosysistemas.com.ar',
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
    title: 'Martín Malgor — Estrategia IT para PYMES del NEA',
    description:
      'Director de Servicios & Sistemas. Ayudo a PYMES de Corrientes, Chaco, Misiones y Formosa a que la tecnología dé resultados: ERP Tango, infraestructura, ciberseguridad e IA aplicada.',
    ogAlt: 'Martín Malgor — Traduzco tecnología a decisiones de negocio.',
  },

  stats: [
    { value: '+1000', label: 'implementaciones Tango' },
    { value: '+200', label: 'empresas por año' },
    { value: '4', label: 'provincias del NEA' },
  ],

  knowsAbout: [
    'Estrategia IT',
    'ERP Tango',
    'Infraestructura IT',
    'Ciberseguridad',
    'Automatización e inteligencia artificial aplicada',
  ],
} as const;

export const whatsappHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`;

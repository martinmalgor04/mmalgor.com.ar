/** Copy de las secciones inferiores. Voz: Martín, primera persona singular, voseo. */
import { profile } from './profile';

interface Faceta {
  title: string;
  text: string;
  /** Sello o isologo al lado del título. `kind` define la altura: cuadrado o apaisado. */
  mark?: { src: string; kind: 'badge' | 'wide'; width: number; height: number };
}

export const queHago = {
  eyebrow: 'Qué hago',
  title: 'En qué puedo ayudarte.',
  items: [
    {
      icon: 'lucide:layers',
      title: 'ERP Tango',
      text: 'Tango implementado como tiene que ser: procesos primero, software después.',
    },
    {
      icon: 'lucide:code',
      title: 'Apps a medida',
      text: 'Lo que el ERP no cubre, lo desarrollamos. Integrado a tu operación, no un sistema paralelo.',
    },
    {
      icon: 'lucide:cpu',
      title: 'Automatizaciones',
      text: 'Casos reales de IA y automatización en PYMES del NEA.',
    },
    {
      icon: 'lucide:shield-check',
      title: 'Infraestructura y ciberseguridad',
      text: 'Vendemos la tranquilidad operativa que tu PYME necesita.',
    },
  ],
};

export const sobreMi: { title: string; lead: string; items: Faceta[] } = {
  title: 'Sobre mí.',
  lead: 'Segunda generación en Servicios y Sistemas. Técnico Certificado Tango Elite. Curso 4to de Ingeniería en Sistemas.',
  items: [
    {
      title: 'Tango Elite',
      mark: { src: profile.tango.badge, kind: 'badge', width: 512, height: 512 },
      text: 'Soy Técnico Certificado Tango Elite, por primera vez. Es el sello con el que en SyS implementamos Tango en el NEA.',
    },
    {
      title: 'Segunda generación',
      mark: { src: profile.sys.isologo, kind: 'wide', width: 1655, height: 603 },
      text: 'Servicios y Sistemas la fundó mi papá, Daniel Malgor. Estamos en Corrientes desde 1993 y yo me incorporé a los 16 años, hace 7. Hoy me toca profesionalizar la operación: ordenar procesos, automatizar lo que se repite y armar el área comercial.',
    },
    {
      title: 'SpaceX AI Ambassador',
      mark: { src: '/brands/spacexai-wordmark-white.png', kind: 'wide', width: 1024, height: 125 },
      text: 'Sostengo la comunidad del NEA y ayudo a quienes arrancan con IA. Armamos experiencias para que más gente conozca los productos de SpaceX AI, como Cursor y Grok Bot. Los probamos y le llevamos feedback al equipo que los construye.',
    },
    {
      title: 'Ingeniería en Sistemas',
      mark: { src: '/brands/utn-wordmark-white.png', kind: 'wide', width: 1200, height: 311 },
      text: '4to año en la UTN, Facultad Regional Resistencia. Lo que veo en empresas del NEA lo llevo al aula, y lo que estudio lo pruebo en SyS.',
    },
  ],
};

export const manifiesto = {
  lines: ['La tecnología sin responsables es un gasto.', 'Con responsables, es la', 'más barata que puede comprar una PYME.'],
  highlight: 'ventaja competitiva',
  principios: [
    {
      title: 'No termina en la venta.',
      text: 'El sistema instalado no sirve de nada si nadie lo usa bien. Nos quedamos hasta que tu equipo trabaja distinto.',
    },
    {
      title: 'Un solo responsable.',
      text: 'Cuando cada parte la atiende un proveedor distinto, el problema nunca es de nadie. Con nosotros hay un solo número al que llamar.',
    },
    {
      title: 'Somos una PYME del NEA.',
      text: 'Sabemos cómo se cobra, se factura y se pagan sueldos acá, porque lo hacemos nosotros todos los meses.',
    },
  ],
};

export const sys = {
  eyebrow: 'Servicios y Sistemas',
  title: 'Servicios y Sistemas.',
  text: 'Desde 1993 en Corrientes. Centro de Ventas y Servicios Certificado Tango Software, partner de HPE, Lenovo, Dell y Sophos.',
  cta: 'Conocé SyS',
};

export const contacto = {
  title: 'Hablemos.',
  text: 'Si dirigís una PYME del NEA y necesitás Tango, una app a medida o automatizar la operación, escribime.',
};

export const meetupsSection = {
  eyebrow: 'Meetups',
  title: 'La comunidad, en vivo.',
};

/** Copy de las secciones. Voz: Martín, primera persona singular, voseo. SyS en tercera. */
import { profile, whatsappTopic } from './profile';

interface Faceta {
  title: string;
  text: string;
  /** Sello o isologo al lado del título. `kind` define la altura: cuadrado o apaisado. */
  mark?: { src: string; kind: 'badge' | 'wide'; width: number; height: number };
}

export const queHago = {
  title: 'Qué hago.',
  items: [
    {
      icon: 'lucide:layers',
      title: 'ERP Tango',
      text: 'Tango implementado como tiene que ser: procesos primero, software después.',
      href: whatsappTopic('ERP Tango'),
      event: 'click-whatsapp-erp',
    },
    {
      icon: 'lucide:code',
      title: 'Apps a medida',
      text: 'Lo que el ERP no cubre lo desarrollo con el equipo de SyS, integrado a tu operación, no un sistema paralelo.',
      href: whatsappTopic('una app a medida'),
      event: 'click-whatsapp-apps',
    },
    {
      icon: 'lucide:cpu',
      title: 'Automatizaciones',
      text: 'Automatizo lo que tu equipo repite a mano: facturación, cobranzas, reportes, avisos por WhatsApp. Con IA donde rinde, no por moda.',
      href: whatsappTopic('automatizar la operación'),
      event: 'click-whatsapp-auto',
    },
    {
      icon: 'lucide:shield-check',
      title: 'Infraestructura y ciberseguridad',
      text: 'Servidores, redes, backups y firewall para que la operación no se caiga. Un solo responsable cuando algo falla.',
      href: whatsappTopic('infraestructura y ciberseguridad'),
      event: 'click-whatsapp-infra',
    },
  ],
};

export const sobreMi: { title: string; lead: string; items: Faceta[] } = {
  title: 'Sobre mí.',
  lead: 'Dirijo la operación de SyS: implementaciones Tango, desarrollo a medida e infraestructura para PYMES del NEA. Estudio Ingeniería en Sistemas y organizo meetups de IA.',
  items: [
    {
      title: 'Tango Elite',
      mark: { src: profile.tango.badge, kind: 'badge', width: 256, height: 256 },
      text: 'Soy Técnico Certificado Tango Elite: es mi primera certificación de Tango. El sello de SyS es otro: Centro de Ventas y Servicios Certificado. El mío es personal.',
    },
    {
      title: 'Empresa familiar, segunda generación',
      mark: { src: profile.sys.isologo, kind: 'wide', width: 1655, height: 603 },
      text: `Servicios y Sistemas la fundó mi papá, Daniel Malgor, en Corrientes, en ${profile.sys.founded}. Yo entré a los 16, en ${profile.joinedYear}. Hoy dirijo la operación.`,
    },
    {
      title: 'SpaceX AI Ambassador',
      mark: { src: '/brands/spacexai-wordmark-white.png', kind: 'wide', width: 1024, height: 125 },
      text: 'Soy embajador voluntario de SpaceX AI en el NEA: organizo meetups y ayudo a quienes arrancan con IA. Armamos experiencias con sus productos (Cursor, el editor de código con IA, y Grok Bot, su asistente) y le llevamos feedback al equipo que los construye.',
    },
    {
      title: 'Ingeniería en Sistemas',
      mark: { src: '/brands/utn-wordmark-white.png', kind: 'wide', width: 1200, height: 311 },
      text: `Cursando ${profile.utn.yearLabel} en la ${profile.utn.short}. Lo que veo en empresas del NEA lo llevo al aula, y lo que estudio lo pruebo en SyS.`,
    },
  ],
};

export const manifiesto = {
  lines: [
    'La tecnología sin responsables es un gasto.',
    'Con responsables, es la',
    'más barata que puede comprar una PYME.',
  ],
  highlight: 'ventaja competitiva',
  principios: [
    {
      title: 'No termina en la venta.',
      text: 'El sistema instalado no sirve si nadie lo usa bien. Me quedo hasta que tu equipo trabaja distinto.',
    },
    {
      title: 'Un solo responsable: yo.',
      text: 'Cuando cada parte la atiende un proveedor distinto, el problema nunca es de nadie. Me llamás a mí.',
    },
    {
      title: 'No te hablo de oídas.',
      text: 'Facturación, cobranzas y sueldos los veo todos los meses en SyS. Lo que te propongo, lo uso.',
    },
  ],
};

export function words(line: string) {
  return line.split(/\s+/);
}

export const sys = {
  eyebrow: 'Donde trabajo',
  title: 'Servicios y Sistemas, Corrientes.',
  text: `Desde ${profile.sys.founded} en Corrientes. ${profile.tango.centro}, partner de HPE, Lenovo, Dell y Sophos.`,
  addressLine: `${profile.sys.address.street}, ${profile.sys.address.city} · ${profile.sys.phoneDisplay}`,
  cta: 'Conocé SyS',
};

export const contacto = {
  title: 'Hablemos.',
  text: 'Si dirigís una PYME del NEA y necesitás Tango, una app a medida o automatizar la operación, escribime.',
  recruiter: '¿Reclutador o de la comunidad? Escribime por LinkedIn.',
};

export const meetupsSection = {
  eyebrow: 'Meetups',
  title: 'La comunidad de IA, en vivo.',
  lead: 'Organizo meetups de SpaceX AI en el NEA: Cursor y Grok Bot, en Corrientes y Resistencia.',
};

export const novedades = {
  eyebrow: 'Novedades',
  title: 'Ahora.',
};

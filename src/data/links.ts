import { profile, whatsappHref } from './profile';

export type LinkKind = 'primary' | 'glass';

export interface LinkItem {
  id: string;
  label: string;
  /** Nombre corto para el footer. */
  short?: string;
  sub?: string;
  href: string;
  icon: string;
  kind: LinkKind;
  /** Nombre del evento en Umami (data-umami-event). */
  event: string;
  external: boolean;
  /** Si está, el botón muestra un control secundario que copia este texto. */
  copy?: string;
}

/** Los 4 links del linktree, en orden. */
export const links: LinkItem[] = [
  {
    id: 'whatsapp',
    label: 'Escribime por WhatsApp',
    short: 'WhatsApp',
    sub: 'Tango, apps a medida, automatización',
    href: whatsappHref,
    icon: 'tabler:brand-whatsapp',
    kind: 'primary',
    event: 'click-whatsapp',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sub: 'Lo que veo en campo, cada semana',
    href: profile.linkedin,
    icon: 'tabler:brand-linkedin',
    kind: 'glass',
    event: 'click-linkedin',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    sub: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'lucide:mail',
    kind: 'glass',
    event: 'click-email',
    external: false,
    copy: profile.email,
  },
  {
    id: 'sys',
    label: profile.sys.name,
    short: 'SyS',
    sub: 'Donde trabajo',
    href: profile.sys.url,
    icon: 'lucide:building',
    kind: 'glass',
    event: 'click-sys',
    external: true,
  },
];

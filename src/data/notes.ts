export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  paragraphs: string[];
}

export const notes: Note[] = [
  {
    slug: 'profesionalizar-sys',
    title: 'Estoy profesionalizando SyS',
    description:
      'La empresa la fundó mi papá en 1993. Yo me incorporé a los 16 años, hace 7. Hoy me toca ordenar procesos, automatizar y armar el área comercial.',
    date: '2026-09-20',
    dateLabel: '20 de septiembre de 2026',
    paragraphs: [
      'Servicios y Sistemas la fundó mi papá, Daniel Malgor. Estamos en Corrientes desde 1993 y yo me incorporé a los 16 años, hace 7. Segunda generación.',
      'Durante mucho tiempo no tomaba las decisiones pesadas. Ahora sí, y lo que me toca es profesionalizar: ordenar procesos, automatizar lo que se repite y armar el área comercial. Con IA donde rinde, no por moda.',
      'Soy Técnico Certificado Tango Elite, por primera vez. Es el sello con el que en SyS implementamos Tango en el NEA.',
      'Lo que veo en las PYMES del NEA lo llevo al aula de la UTN, y lo que estudio lo pruebo acá. Si tu operación necesita Tango, una app a medida o automatizar algo, escribime.',
    ],
  },
];

export const noteBySlug: Record<string, Note> = Object.fromEntries(notes.map((n) => [n.slug, n]));

/** Fechas visibles. Una sola función para no duplicar ISO y label a mano. */
const fmt = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long',
  timeZone: 'America/Argentina/Buenos_Aires',
});

/** `iso` es `YYYY-MM-DD` calendario, no un instante UTC. */
export function fecha(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return fmt.format(new Date(y, m - 1, d));
}

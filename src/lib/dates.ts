/** Fechas visibles. Una sola función para no duplicar ISO y label a mano. */
const fmt = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

/**
 * `iso` es `YYYY-MM-DD` de calendario, no un instante.
 * Se formatea en UTC para que el día no se corra cuando el build corre en UTC
 * (en Buenos Aires, la medianoche local del servidor cae en el día anterior).
 */
export function fecha(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return fmt.format(new Date(Date.UTC(y, m - 1, d)));
}

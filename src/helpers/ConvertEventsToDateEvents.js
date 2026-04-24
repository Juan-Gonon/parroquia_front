import { parseISO } from 'date-fns'

export const convertEventsToDateEvents = (events = []) => {
  return events.map((event) => ({
    ...event,
    title: event.nombre,
    fecha_ini: event.fecha_ini ? parseISO(event.fecha_ini) : null,
    fecha_fin: event.fecha_fin
      ? parseISO(event.fecha_fin)
      : parseISO(event.fecha_ini),
  }))
}

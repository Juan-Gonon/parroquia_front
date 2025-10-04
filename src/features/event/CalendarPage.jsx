import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  convertEventsToDateEvents,
  getMessagesES,
  localizer,
} from '../../helpers'
import { useState } from 'react'

const myEventsList = [
  {
    title: 'Misa Dominical',
    start: '2025-10-05', // Mes 4 es Mayo
    end: '2025-10-05',
    type: 'Misa',
  },
  {
    title: 'Formación Litúrgica',
    start: '2025-10-06',
    end: '2025-10-06',
    type: 'Formacion',
  },
  {
    title: 'Actividad Comunita...',
    start: '2025-10-06',
    end: '2025-10-06',
    type: 'Actividad',
  },
  {
    title: 'Reunión Pasada',
    start: '2025-10-15',
    end: '2025-10-15',
    type: 'Reunion',
  },
]

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: '#3174ad', // Por defecto
    color: 'white',
  }

  if (event.type === 'Misa') {
    style.backgroundColor = '#007bff' // Azul para Misa
  } else if (event.type === 'Formacion') {
    style.backgroundColor = '#4CAF50' // Verde para Formación
  } else if (event.type === 'Actividad') {
    style.backgroundColor = '#FFC107' // Amarillo para Actividad
    style.color = '#333' // Texto oscuro para fondo amarillo
  }

  return { style }
}

const newEvents = convertEventsToDateEvents(myEventsList)
export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  const onViewChanged = (e) => {
    // console.log(e)
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  return (
    <Calendar
      culture='es'
      localizer={localizer}
      events={newEvents}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 'calc(85vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      className='custom-calendar'
      onView={onViewChanged}
      defaultView={lastView}
    />
  )
}

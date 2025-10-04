import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { useState } from 'react'

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

// const newEvents = convertEventsToDateEvents(myEventsList)
export const CalendarPage = ({ data }) => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  const onViewChanged = (e) => {
    // console.log(e)
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  // console.log(data)

  return (
    <Calendar
      culture='es'
      localizer={localizer}
      events={data}
      startAccessor='fecha_ini'
      endAccessor='fecha_fin'
      style={{ height: 'calc(85vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      className='custom-calendar'
      onView={onViewChanged}
      defaultView={lastView}
      view={lastView}
    />
  )
}

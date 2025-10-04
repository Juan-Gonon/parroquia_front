import { useState } from 'react'
import { getAllEventService } from '../service/eventService'
import { convertEventsToDateEvents } from '../helpers'

export const useEvent = () => {
  const [events, setEvents] = useState([])

  const getAllEventsS = async () => {
    try {
      const res = await getAllEventService()

      const data = convertEventsToDateEvents(res.data)

      setEvents(data)
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }
  return {
    events,

    getAllEventsS,
  }
}

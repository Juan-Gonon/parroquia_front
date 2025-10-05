import { useState } from 'react'
import {
  getAllEventService,
  getAllEventTypeService,
} from '../service/eventService'
import { convertEventsToDateEvents } from '../helpers'

export const useEvent = () => {
  const [events, setEvents] = useState([])
  const [evType, setEtype] = useState([])

  const getAllEventsS = async () => {
    try {
      const res = await getAllEventService()

      const data = convertEventsToDateEvents(res.data)

      setEvents(data)

      return data
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const getAllEventTypeS = async () => {
    try {
      const res = await getAllEventTypeService()

      setEtype(res.data)
      return res.data
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }
  return {
    events,
    evType,
    getAllEventsS,
    getAllEventTypeS,
  }
}

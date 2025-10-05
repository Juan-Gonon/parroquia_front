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

  const createEventS = async ({ data }) => {
    const { descripcion, fechaFin, nombre_celebrante_externo, ...rest } = data

    const newData = rest

    if (descripcion?.length) newData.descripcion = descripcion
    if (fechaFin?.length) newData.fechaFin = fechaFin
    if (nombre_celebrante_externo?.length)
      newData.nombrecelebranteexterno = nombre_celebrante_externo

    console.log(newData)
  }
  return {
    events,
    evType,
    getAllEventsS,
    getAllEventTypeS,
    createEventS,
  }
}

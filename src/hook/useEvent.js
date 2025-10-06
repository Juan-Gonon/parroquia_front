import { useState } from 'react'
import {
  createEventService,
  deleteEventService,
  getAllEventService,
  getAllEventTypeService,
  updateEventService,
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

    try {
      const res = await createEventService({ data: newData })

      // await getAllParish({ page: 1, limit: 10 })

      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const updateEventS = async ({ data, id }) => {
    const { descripcion, fechaFin, nombre_celebrante_externo, ...rest } = data

    const newData = rest

    if (descripcion?.length) newData.descripcion = descripcion
    if (fechaFin?.length) newData.fechaFin = fechaFin
    if (nombre_celebrante_externo?.length)
      newData.nombrecelebranteexterno = nombre_celebrante_externo

    try {
      if (!id) {
        throw new Error('El id del personal es requerido')
      }

      const res = await updateEventService({ data: newData, id })

      return res.data
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const deleteEventS = async ({ id }) => {
    try {
      if (!id) {
        throw new Error('El id del personal es requerido')
      }

      const res = await deleteEventService({ id })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    events,
    evType,
    getAllEventsS,
    getAllEventTypeS,
    createEventS,
    updateEventS,
    deleteEventS,
  }
}

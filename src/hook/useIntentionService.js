import { useState } from 'react'
import {
  createIntencionService,
  deleteIntentionService,
  getIntentionByEventService,
  updateIntentionService,
} from '../service/intentionService'

export const useIntentionService = () => {
  const [intention, setIntention] = useState([])

  const getIntentionByEventS = async ({ id }) => {
    try {
      if (!id) throw new Error('Se requiere el id del evento')

      const res = await getIntentionByEventService({ id })

      setIntention(res?.data)
      return res
    } catch (error) {
      throw error || { message: 'Error al encontrar grupo' }
    }
  }

  const createIntencionS = async ({ data }) => {
    const { fechaPago, montoPagado, montoOfrenda, ...rest } = data
    const newData = { ...rest }

    if (fechaPago?.length) newData.fechaPago = fechaPago
    if (montoPagado?.length) newData.montoPagado = montoPagado
    if (montoOfrenda?.length) newData.montoOfrenda = montoOfrenda

    try {
      const res = await createIntencionService({ data: newData })
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const updateIntentionS = async ({ data, id }) => {
    const { fechaPago, montoOfrenda, montoPagado, ...rest } = data
    const newData = rest

    if (fechaPago?.length) newData.fechaPago = fechaPago
    if (montoOfrenda?.length) newData.montoOfrenda = montoOfrenda
    if (montoPagado?.length) newData.montoPagado = montoPagado
    // console.log(newData)
    if (!newData?.pagada) newData.montoPagado = '0'
    try {
      if (!id) throw new Error('El id de la intención es requerido')

      const res = await updateIntentionService({ data: newData, id })
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const deleteIntentionS = async ({ id }) => {
    try {
      if (!id) throw new Error('El id de la intención es requerido')

      const res = await deleteIntentionService({ id })
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  return {
    intention,
    getIntentionByEventS,
    createIntencionS,
    updateIntentionS,
    deleteIntentionS,
  }
}

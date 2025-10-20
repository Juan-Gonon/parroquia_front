import { useState } from 'react'
import {
  createIntencionService,
  getIntentionByEventService,
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

  return {
    intention,
    getIntentionByEventS,
    createIntencionS,
  }
}

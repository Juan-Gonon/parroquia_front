import { useState } from 'react'
import { getIntentionByEventService } from '../service/intentionService'

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

  return {
    intention,
    getIntentionByEventS,
  }
}

import { useState } from 'react'
import { getIntentionByYearAndMonthService } from '../service/intentionService'

export const useHomeInfo = () => {
  const [data, setData] = useState({})
  const getAllIntentionByYearAndMonthS = async ({ year, month }) => {
    try {
      if (!year) throw new Error('El año de las intenciones es requerida')
      if (!month) throw new Error('El mes de las intenciones es requerida')

      const res = await getIntentionByYearAndMonthService({ year, month })
      // console.log(res)
      setData(res)
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    data,
    getAllIntentionByYearAndMonthS,
  }
}

import { useState } from 'react'
import {
  getByLastMonthsService,
  getIntentionByYearAndMonthService,
} from '../service/intentionService'
import { getAllUpcomingEventService } from '../service/eventService'

export const useHomeInfo = () => {
  const [data, setData] = useState({})
  const [lastMonths, setLastMonths] = useState([])
  const [eventU, setEventU] = useState([])
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
  const getByLastMonthsS = async ({ count }) => {
    try {
      if (!count) throw new Error('El parametro count es requerido')

      const res = await getByLastMonthsService({ count })
      // console.log(res)
      setLastMonths(res)
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const getAllUpcomingEventS = async () => {
    try {
      const res = await getAllUpcomingEventService()
      // console.log(res)
      setEventU(res)
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  return {
    data,
    lastMonths,
    eventU,
    getAllIntentionByYearAndMonthS,
    getByLastMonthsS,
    getAllUpcomingEventS,
  }
}

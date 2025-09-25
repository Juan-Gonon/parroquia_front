import { useState } from 'react'
import { getAllMinistryService } from '../service/ministryService'

export const useMinistryService = () => {
  const [ministry, setMinistry] = useState([])

  const getAllMinistryS = async ({ page = 1, limit = 20 }) => {
    try {
      const res = await getAllMinistryService({ page, limit })

      setMinistry(res.data)

      return res
    } catch (error) {
      return error
    }
  }
  return {
    ministry,
    getAllMinistryS,
  }
}

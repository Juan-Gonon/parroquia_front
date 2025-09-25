import { useState } from 'react'
import {
  getAllMinistryService,
  getAllRoleMinistryService,
} from '../service/ministryService'

export const useMinistryService = () => {
  const [ministry, setMinistry] = useState([])
  const [role, setRole] = useState([])

  const getAllMinistryS = async ({ page = 1, limit = 20 }) => {
    try {
      const res = await getAllMinistryService({ page, limit })

      setMinistry(res.data)

      return res
    } catch (error) {
      return error
    }
  }

  const getAllRoleDMinistryS = async ({ page = 1, limit = 20 }) => {
    try {
      const res = await getAllRoleMinistryService({ page, limit })

      setRole(res.data)
      return res
    } catch (error) {
      return error
    }
  }
  return {
    ministry,
    role,
    getAllMinistryS,
    getAllRoleDMinistryS,
  }
}

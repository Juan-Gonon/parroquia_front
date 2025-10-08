import { useState } from 'react'
import {
  deleteMinistryService,
  getAllMinistryService,
  getAllRoleMinistryService,
  updateMinistryService,
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

  const updateMinistryS = async ({ data, id }) => {
    const { descripcion, ...rest } = data

    const newData = rest
    if (descripcion?.length) newData.descripcion = descripcion

    try {
      if (!id) throw new Error('Error al actualizar el ministerio')

      const res = await updateMinistryService({ data: newData, id })

      return res.data
    } catch (error) {
      throw error || { message: 'Error al actualizar' }
    }
  }

  const deleteMinistryS = async ({ id }) => {
    try {
      if (!id) throw new Error('Error al eliminar el ministerio')

      const res = await deleteMinistryService({ id })

      return res.data
    } catch (error) {
      throw error || { message: 'Error al eliminar ministerio' }
    }
  }
  return {
    ministry,
    role,
    getAllMinistryS,
    getAllRoleDMinistryS,
    updateMinistryS,
    deleteMinistryS,
  }
}

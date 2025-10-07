import { useState } from 'react'
import {
  createCommunityLeadersService,
  deleteCommunityLeadersService,
  getAllCommunityLeadersService,
  updateCommunityLeadersService,
} from '../service/ministersService'

export const useMinisters = () => {
  const [ministers, setMinisters] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    next: null,
    prev: null,
  })

  const getAllMinisters = async ({
    page = pagination.page,
    limit = pagination.limit,
  }) => {
    try {
      const res = await getAllCommunityLeadersService({ page, limit })

      setMinisters(res.data)

      setPagination({
        page: res.page,
        limit: res.limit,
        total: res.total,
        next: res.next,
        prev: res.prev,
      })

      return res.data
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const createLeaderS = async ({ data }) => {
    const { fechaFin, ...rest } = data

    const newData = rest

    if (fechaFin?.length) newData.fechaFin = fechaFin

    try {
      const res = await createCommunityLeadersService({ data: newData })

      // await getAllParish({ page: 1, limit: 10 })

      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const updateMinistersS = async ({ data, id }) => {
    const { fechaFin, ...rest } = data

    const newData = rest

    if (fechaFin?.length) newData.fechaFin = fechaFin

    try {
      const res = await updateCommunityLeadersService({ data: newData, id })

      return res.data
    } catch (error) {
      throw error || { message: 'No se puede actualizar el registro' }
    }
  }

  const deleteMinistersS = async ({ id }) => {
    try {
      if (!id) new Error('Se requiere el id para completar la accion')

      const res = await deleteCommunityLeadersService({ id })

      return res.data
    } catch (error) {
      throw error || { message: 'No se puede actualizar el registro' }
    }
  }
  return {
    ministers,
    getAllMinisters,
    createLeaderS,
    updateMinistersS,
    deleteMinistersS,
  }
}

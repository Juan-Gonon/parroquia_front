/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
  createGrupoService,
  deleteGrupoService,
  getAllGruposService,
  getByIdGrupoServicio,
  updateGrupoService,
} from '../service/grupoServicioService'

export const useGrupoServicioService = () => {
  const [grupos, setGrupos] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    next: null,
    prev: null,
  })

  const getAllGruposS = async ({
    page = pagination.page,
    limit = pagination.limit,
  }) => {
    try {
      const res = await getAllGruposService({ page, limit })

      setGrupos(res.data)

      setPagination({
        page: res.page,
        limit: res.limit,
        total: res.total,
        next: res.next,
        prev: res.prev,
      })

      return res.data
    } catch (error) {
      throw error || { message: 'Error al obtener los grupos' }
    }
  }

  const createGrupoS = async ({ data }) => {
    const newData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined
      )
    )

    try {
      const res = await createGrupoService({ data: newData })
      return res
    } catch (error) {
      throw error || { message: 'Error al crear el grupo' }
    }
  }

  const updateGrupoS = async ({ data, id }) => {
    const newData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined
      )
    )

    try {
      const res = await updateGrupoService({ data: newData, id })
      return res
    } catch (error) {
      throw error || { message: 'Error al actualizar el grupo' }
    }
  }

  const deleteGrupoS = async ({ id }) => {
    try {
      if (!id) throw new Error('Se requiere el id para eliminar el grupo')

      const res = await deleteGrupoService({ id })
      return res
    } catch (error) {
      throw error || { message: 'Error al eliminar el grupo' }
    }
  }

  const getByIdGrupoS = async ({ id }) => {
    try {
      if (!id) throw new Error('Se requiere el id para eliminar el grupo')

      const res = await getByIdGrupoServicio({ id })

      setGrupos(res)
      return res
    } catch (error) {
      throw error || { message: 'Error al encontrar grupo' }
    }
  }
  return {
    grupos,
    pagination,
    getAllGruposS,
    createGrupoS,
    updateGrupoS,
    deleteGrupoS,
    getByIdGrupoS,
  }
}

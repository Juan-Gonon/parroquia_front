import { useState } from 'react'
import {
  createAsigEventGrouptService,
  deleteAsigGroupService,
  getAllByEventAsigGroupService,
} from '../service/asigGroupEventService'

export const useAsigEventGroup = () => {
  const [groups, setGroups] = useState([])
  const createAsigEventGrouptS = async ({ data }) => {
    const { notas, ...rest } = data

    const newData = rest

    if (notas?.length) newData.notas = notas
    try {
      const res = await createAsigEventGrouptService({ data: newData })
      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const getAllByEventAsigGroupS = async ({ id }) => {
    try {
      if (!id) {
        throw new Error('El id del grupo es requerido')
      }

      const res = await getAllByEventAsigGroupService({ id })

      setGroups(res?.data)
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const deleteAsigGroupS = async ({ id }) => {
    try {
      if (!id) {
        throw new Error('El id del grupo es requerido')
      }

      const res = await deleteAsigGroupService({ id })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    groups,
    createAsigEventGrouptS,
    getAllByEventAsigGroupS,
    deleteAsigGroupS,
  }
}

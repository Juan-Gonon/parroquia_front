import { useState } from 'react'
import {
  createCommunityService,
  deleteCommunityService,
  getAllCommunityService,
  updateCommunityService,
} from '../service/communityService'

export const useCommunity = () => {
  const [community, setCommunity] = useState([])

  const getAllCommunityS = async ({ page = 1, limit = 20 }) => {
    try {
      const res = await getAllCommunityService({ page, limit })

      setCommunity(res?.data)

      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const createCommunityS = async ({ data }) => {
    const { telefono, email, ...resData } = data

    const newData = resData

    if (telefono?.length) newData.telefono = telefono
    if (email?.length) newData.email = email

    try {
      const res = await createCommunityService({ data: newData })

      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const updateCommunityS = async ({ id, data }) => {
    const { telefono, email, ...resData } = data

    const newData = resData

    if (telefono?.length) newData.telefono = telefono
    if (email?.length) newData.email = email

    try {
      if (!id) {
        throw new Error('El id del personal es requerido')
      }

      const res = await updateCommunityService({ id, data: newData })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const deleteCommnityS = async ({ id }) => {
    try {
      if (!id) {
        throw new Error('El id del personal es requerido')
      }

      const res = await deleteCommunityService({ id })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    community,
    getAllCommunityS,
    createCommunityS,
    updateCommunityS,
    deleteCommnityS,
  }
}

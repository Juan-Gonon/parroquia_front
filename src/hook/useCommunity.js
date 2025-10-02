import { useState } from 'react'
import {
  createCommunityService,
  getAllCommunityService,
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

      console.log(res)
      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }
  return {
    community,
    getAllCommunityS,
    createCommunityS,
  }
}

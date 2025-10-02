import { useState } from 'react'
import { getAllCommunityService } from '../service/communityService'

export const useCommunity = () => {
  const [community, setCommunity] = useState([])

  const getAllCommunityS = async ({ page = 1, limit = 20 }) => {
    try {
      const res = await getAllCommunityService({ page, limit })

      setCommunity(res?.data)

      return res
    } catch (error) {
      throw error | { error: '' }
    }
  }
  return {
    community,
    getAllCommunityS,
  }
}

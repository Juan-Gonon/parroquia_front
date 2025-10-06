import { useState } from 'react'
import { getAllCommunityLeadersService } from '../service/ministersService'

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
  return {
    ministers,
    getAllMinisters,
  }
}

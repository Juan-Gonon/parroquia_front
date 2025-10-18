import { useCallback, useState } from 'react'
import {
  createFeligresService,
  deleteFeligresService,
  getAllFeligresService,
  updateFeligresService,
} from '../service/feligresService'

export const useFeligres = () => {
  const [feligreses, setFeligreses] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    next: false,
    prev: false,
  })

  const getAllFeligres = useCallback(async ({ page = 1, limit = 10 }) => {
    const res = await getAllFeligresService({ page, limit })
    if (res?.data) {
      setFeligreses(res.data)
      setPagination(res.pagination || { page, limit })
    }
    return res
  }, [])

  const createFeligres = async ({ data }) =>
    await createFeligresService({ data })
  const updateFeligres = async ({ id, data }) =>
    await updateFeligresService({ id, data })
  const deleteFeligres = async ({ id }) => await deleteFeligresService({ id })

  return {
    feligreses,
    getAllFeligres,
    createFeligres,
    updateFeligres,
    deleteFeligres,
    pagination,
  }
}

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
    total: 0,
    next: null,
    prev: null,
  })

  const getAllFeligres = useCallback(
    async ({ page = pagination.page, limit = pagination.limit }) => {
      const res = await getAllFeligresService({ page, limit })
      if (res?.feligreses) {
        setFeligreses(res.feligreses)
        setPagination({
          page: res.page,
          limit: res.limit,
          total: res.total,
          next: res.next,
          prev: res.prev,
        })
      }
      return res
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const createFeligres = async ({ data }) => {
    const { telefono, email, ...rest } = data

    const newData = { ...rest }

    if (telefono?.length) newData.telefono = telefono
    if (email?.length) newData.email = email

    try {
      const res = await createFeligresService({ data: newData })
      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const updateFeligres = async ({ id, data }) => {
    const { telefono, email, ...rest } = data

    const newData = { ...rest }

    if (telefono?.length) newData.telefono = telefono
    if (email?.length) newData.email = email

    try {
      const res = await updateFeligresService({ id, data: newData })
      return res.data
    } catch (error) {
      throw error || { message: 'No se puede actualizar el registro' }
    }
  }

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

import parishApi from '../api/api'

export const getAllFeligresService = async ({ page = 1, limit = 10 }) => {
  try {
    const res = await parishApi.get('/feligreses', { params: { page, limit } })
    if (res.status !== 200) throw new Error('Error al obtener feligreses')

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || 'Error desconocido'
    throw new Error(message)
  }
}

export const createFeligresService = async ({ data }) => {
  try {
    const res = await parishApi.post('/feligreses', data)
    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const updateFeligresService = async ({ id, data }) => {
  try {
    const res = await parishApi.put(`/feligreses/${id}`, data)
    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteFeligresService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/feligreses/${id}`)
    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

import parishApi from '../api/api'

export const getAllMinistryService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/ministry', {
      params: {
        page,
        limit,
      },
    })

    if (res.status !== 200) {
      throw new Error('No se pudo obtener los ministerios')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

import parishApi from '../api/api'

export const createAsigEventGrouptService = async ({ data }) => {
  try {
    const res = await parishApi.post('/asigeventgroup', data)

    if (res.status !== 200) {
      throw new Error('No se pudo crear el registro')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

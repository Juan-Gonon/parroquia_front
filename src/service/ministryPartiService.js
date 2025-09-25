import parishApi from '../api/api'

export const createMinistryParticipatonService = async ({ data }) => {
  try {
    const res = await parishApi.post('/ministy-participation', data)

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

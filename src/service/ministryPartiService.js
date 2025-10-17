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

export const getByMinisteryParticipationService = async ({ id }) => {
  try {
    const res = await parishApi.get(`/ministy-participation/${id}`)

    if (res.status !== 200) {
      throw new Error('No se pudo crear el registro')
    }

    const newData = res?.data?.map((item) => {
      const { id_ministerio, id_part_min, personalparroquial } = item

      return {
        id: personalparroquial.id_personal,
        nombre: personalparroquial.nombre,
        apellido: personalparroquial.apellido,
        id_ministerio,
        id_part_min,
      }
    })

    return newData
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

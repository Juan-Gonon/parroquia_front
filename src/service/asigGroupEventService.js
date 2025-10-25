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

export const getAllByEventAsigGroupService = async ({ id }) => {
  try {
    const res = await parishApi.get(`/asigeventgroup/${id}`)

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los grupos')
    }

    const newData = res.data.map((item) => {
      const { id_asig_ge, id_evento, id_grp_srv, gruposervicio } = item

      return {
        id_asig_ge,
        id_evento,
        id_grp_srv,
        id_grupo: gruposervicio?.id_grupo || null,
        nombre: gruposervicio?.nombre || null,
        ministerio: gruposervicio?.ministerio.nombre || null,
      }
    })

    return {
      data: newData,
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Error desconocido al obtener las intenciones del evento'
    throw new Error(message)
  }
}

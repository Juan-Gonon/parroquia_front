import parishApi from '../api/api'

export const getAllCommunityService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/communities', {
      params: {
        page,
        limit,
      },
    })

    if (res.status !== 200) {
      throw new Error('No se pudo crear el registro')
    }

    const { comunities, next, prev, total } = res.data

    const newData = comunities?.map((comunity) => {
      const {
        id_comunidad,
        nombre,
        direccion,
        email,
        telefono,
        id_parroquia,
        parroquia,
      } = comunity

      return {
        id_comunidad,
        nombre,
        direccion,
        email,
        telefono,
        id_parroquia,
        parroquia: parroquia.nombre,
      }
    })

    return {
      data: newData,
      next,
      prev,
      total,
      page: res.data.page,
      limit: res.data.limit,
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const createCommunityService = async ({ data }) => {
  try {
    const res = await parishApi.post('/communities', data)

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

export const updateCommunityService = async ({ id, data }) => {
  try {
    const res = await parishApi.put(`/communities/${id}`, data)

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

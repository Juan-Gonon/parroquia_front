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

export const getAllRoleMinistryService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/role-d-ministry', {
      params: {
        page,
        limit,
      },
    })

    if (res.status !== 200) {
      throw new Error('No se pudo obtener los roles')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const updateMinistryService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/ministry/${id}`, data)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se puede actualizar el ministerio')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteMinistryService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/ministry/${id}`)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se puede eliminar el ministerio')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

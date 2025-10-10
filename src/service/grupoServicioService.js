import parishApi from '../api/api'

export const getAllGruposService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/service-group', {
      params: { page, limit },
    })

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los grupos')
    }

    const newData = res.data.data?.map((group) => {
      const { nombre, descripcion, id_grupo, id_ministerio, activo } = group

      const ministerio = group.ministerio.nombre

      return {
        nombre,
        descripcion,
        activo,
        id_grupo,
        id_ministerio,
        ministerio,
      }
    })

    return {
      data: newData,
      limit: res.data.limit,
      next: res.data.next,
      page: res.data.page,
      prev: res.data.prev,
      total: res.data.total,
    }
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || 'Error desconocido'
    throw new Error(message)
  }
}

export const createGrupoService = async ({ data }) => {
  try {
    const res = await parishApi.post('/service-group', data)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo crear el grupo')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const updateGrupoService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/service-group/${id}`, data)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo actualizar el grupo')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteGrupoService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/service-group/${id}`)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo eliminar el grupo')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

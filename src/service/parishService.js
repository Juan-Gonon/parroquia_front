import parishApi from '../api/api'

export const getAllParishService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/parish-staff', {
      params: { page, limit },
    })

    if (res.status !== 200) {
      throw new Error(`Error: ${res.status}`)
    }

    const newData = res.data.data.map((parish) => {
      const {
        id_personal,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
        personal_rol,
        participacionministerio,
      } = parish

      const rol = personal_rol[0]?.rolpersonal?.nombre || null
      const descripcion = personal_rol[0]?.rolpersonal?.descripcion || null

      const ministerio = participacionministerio.length
        ? participacionministerio
            .map((p) => p?.ministerio?.nombre)
            .filter(Boolean)
            .join(', ')
        : null

      return {
        id: id_personal,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
        rol,
        descripcion,
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

export const getAllParishRolService = async ({ page = 1, limit = 10 }) => {
  try {
    const res = await parishApi.get('/personal-role', {
      params: {
        page,
        limit,
      },
    })

    if (res.status !== 200) return

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const createParishServie = async ({ data }) => {
  try {
    const res = await parishApi.post('/parish-staff', data)

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

export const deleteParishService = async (id) => {
  try {
    const res = await parishApi.delete(`/parish-staff/${id}`)
    if (res.status !== 200) {
      throw new Error('No se pudo eliminar el registro')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const updateParishService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/parish-staff/${id}`, data)

    if (res.status !== 200) {
      throw new Error('No se pudo editar el registro')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

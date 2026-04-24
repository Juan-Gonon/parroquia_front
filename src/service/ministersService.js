import parishApi from '../api/api'

export const getAllCommunityLeadersService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/comunity-leader', {
      params: { page, limit },
    })

    if (res.status !== 200) {
      throw new Error(`Error: ${res.status}`)
    }

    const newData = res.data.data.map((leader) => {
      const {
        id_lider,
        rolliderazgo,
        fecha_ini,
        activo,
        comunidad,
        personalparroquial,
        id_personal,
        id_comunidad,
      } = leader

      return {
        id: id_lider,
        nombre: personalparroquial?.nombre || '',
        apellido: personalparroquial?.apellido || '',
        telefono: personalparroquial?.telefono || '',
        email: personalparroquial?.email || '',
        comunidad: comunidad?.nombre || 'Sin comunidad',
        direccion: personalparroquial?.direccion || '',
        fechaInicio: fecha_ini || null,
        rolLiderazgo: rolliderazgo || null,
        activo: Boolean(activo),
        id_personal,
        id_comunidad,
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

export const createCommunityLeadersService = async ({ data }) => {
  try {
    const res = await parishApi.post('/comunity-leader', data)

    if (res.status !== 200 && res.status !== 201) {
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

export const updateCommunityLeadersService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/comunity-leader/${id}`, data)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo actualizar el registro')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteCommunityLeadersService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/comunity-leader/${id}`)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo actualizar el registro')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

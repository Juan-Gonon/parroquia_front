import parishApi from '../api/api'

export const getIntentionByEventService = async ({ id }) => {
  try {
    const res = await parishApi.get(`/intention/${id}`)

    const newData = res.data.map((item) => {
      const {
        feligres,
        tipointencion,
        descripcion,
        fechasolicitud,
        id_evento,
        id_intencion,
        pagada,
        montopagado,
        montoofrenda,
        estadointencion,
      } = item

      const { id_feligres, nombre, apellido } = feligres || {}
      const { id_tipointencion, nombre: nom } = tipointencion || {}
      const { id_estadoin, nombre: nomIn } = estadointencion || {}

      return {
        id_evento,
        id_intencion,
        id_feligres,
        id_estadoin,
        feligres: `${nombre} ${apellido}`,
        tipo: nom,
        id_tipointencion,
        descripcion,
        solicitud: fechasolicitud,
        ofrenda: montoofrenda,
        montopagado: montopagado ?? '0',
        estado_pago: pagada,
        estado: nomIn,
      }
    })

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los miembros del grupo')
    }

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

export const getAllTypeIntentionService = async () => {
  try {
    const res = await parishApi.get('/intentional-type')

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los tipos de intencion')
    }

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Error desconocido al obtener las intenciones del evento'
    throw new Error(message)
  }
}

export const getAllStateIntentionService = async () => {
  try {
    const res = await parishApi.get('/state-intention')

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los tipos de estado')
    }

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Error desconocido al obtener las intenciones del evento'
    throw new Error(message)
  }
}

export const createIntencionService = async ({ data }) => {
  try {
    const res = await parishApi.post('/intention', data)
    if (res.status !== 200) {
      throw new Error('No se pudo crear la intención')
    }
    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

export const updateIntentionService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/intention/${id}`, data)

    if (res.status !== 200) {
      throw new Error('No se pudo actualizar la intención')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteIntentionService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/intention/${id}`)

    if (res.status !== 200) {
      throw new Error('No se pudo eliminar la intención')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

export const getIntentionByYearAndMonthService = async ({ year, month }) => {
  try {
    const res = await parishApi.get(`/intention/by-month/${year}/${month}`)

    if (res.status !== 200) {
      throw new Error('No se pudo obtener datos')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

export const getByLastMonthsService = async ({ count }) => {
  try {
    const res = await parishApi.get(`/intention/by-last-months/${count}`)

    if (res.status !== 200) {
      throw new Error('No se pudo obtener datos')
    }

    return res.data
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

import parishApi from '../api/api'

export const getAllEventService = async () => {
  try {
    const res = await parishApi.get('/event')

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

export const getAllEventTypeService = async () => {
  try {
    const res = await parishApi.get('/event-type')

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

export const createEventService = async ({ data }) => {
  try {
    const res = await parishApi.post('/event', data)

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

export const updateEventService = async ({ data, id }) => {
  try {
    const res = await parishApi.put(`/event/${id}`, data)

    if (res.status !== 200) {
      throw new Error('No se pudo actualizar el evento')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const deleteEventService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/event/${id}`)

    if (res.status !== 200) {
      throw new Error('No se pudo eliminar el evento')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

export const getEventByIdService = async ({ id }) => {
  try {
    const res = await parishApi.get(`/event/${id}`)

    if (res.status !== 200) {
      throw new Error('El evento no existe')
    }

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

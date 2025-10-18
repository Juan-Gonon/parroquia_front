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
        montoofrenda,
      } = item

      const { id_feligres, nombre, apellido } = feligres || {}
      const { id_tipointencion, nombre: nom } = tipointencion || {}

      return {
        id_evento,
        id_intencion,
        id_feligres,
        feligres: `${nombre} ${apellido}`,
        tipo: nom,
        id_tipointencion,
        descripcion,
        solicitud: fechasolicitud,
        ofrenda: montoofrenda,
        estado_pago: pagada,
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

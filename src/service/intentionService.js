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

import parishApi from '../api/api'

export const getMiembrosByGrupoService = async ({ id }) => {
  try {
    const res = await parishApi.get(`/group-member/${id}`)

    if (res.status !== 200) {
      throw new Error('No se pudieron obtener los miembros del grupo')
    }

    const newData = res.data?.map((item) => {
      const {
        id_miembrogrupo,
        id_gruposervicio,
        id_part_min,
        fecha_ini_msia,
        activo,
        gruposervicio,
        participacionministerio,
      } = item

      // Datos dentro de participacionministerio
      const { fecha_ini_part, personalparroquial, roldentroministerio } =
        participacionministerio || {}

      // Datos dentro de personalparroquial
      const {
        nombre: nombrePersonal,
        apellido,
        email,
        direccion,
      } = personalparroquial || {}

      // Datos dentro de roldentroministerio
      const { nombre: rol } = roldentroministerio || {}

      return {
        id_miembrogrupo,
        id_gruposervicio,
        id_part_min,
        fecha_ini_msia,
        activo,
        nombre_grupo: gruposervicio?.nombre || null,
        fecha_ini_part: fecha_ini_part || null,
        nombre_personal: nombrePersonal || null,
        apellido_personal: apellido || null,
        email_personal: email || null,
        direccion_personal: direccion || null,
        rol_ministerio: rol || null,
      }
    })

    return {
      data: newData,
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Error desconocido al obtener los miembros del grupo'
    throw new Error(message)
  }
}

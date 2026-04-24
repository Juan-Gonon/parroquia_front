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
        nombre: nombrePersonal || null,
        apellido: apellido || null,
        email: email || null,
        direccion: direccion || null,
        id_miembrogrupo,
        id_gruposervicio,
        id_part_min,
        fecha_ini_msia,
        activo,
        nombre_grupo: gruposervicio?.nombre || null,
        fecha_ini_part: fecha_ini_part || null,
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

export const createMemberGroupService = async ({ data }) => {
  try {
    const res = await parishApi.post('/group-member', data)

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

export const deleteMemberGroupService = async ({ id }) => {
  try {
    const res = await parishApi.delete(`/group-member/${id}`)

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('No se pudo eliminar el miembro del grupo')
    }

    return res
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    throw new Error(error.message || 'Error desconocido')
  }
}

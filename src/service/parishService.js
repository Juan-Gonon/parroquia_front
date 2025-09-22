import parishApi from '../api/api'

export const getAllParishService = async ({ page, limit }) => {
  try {
    const res = await parishApi.get('/parish-staff', {
      params: {
        page,
        limit,
      },
    })

    if (res.status !== 200) return

    // const { data, limit, next, page, prev, total } = res.data

    const newData = res.data.data.map((parish) => {
      const {
        // id_personal,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
        personal_rol,
      } = parish
      let rol = null
      let descripcion = null

      if (personal_rol.length > 0) {
        const { rolpersonal } = personal_rol[0]
        rol = rolpersonal.nombre
        descripcion = rolpersonal.descripcion
      }

      return {
        // id_personal,
        nombre,
        apellido,
        email,
        direccion,
        telefono,
        rol,
        descripcion,
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
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
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
    console.log(error)
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

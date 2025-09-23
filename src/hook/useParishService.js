import React, { useState } from 'react'
import {
  createParishServie,
  deleteParishService,
  getAllParishRolService,
  getAllParishService,
} from '../service/parishService'

export const useParishService = () => {
  const [parish, setParish] = useState([])
  const [role, setRole] = useState([])

  const getAllParish = ({ page = 1, limit = 10 }) => {
    getAllParishService({ page, limit })
      .then((res) => setParish(res.data))
      .catch((error) => console.log(error.message))
  }

  const getAllParishRol = ({ page, limit }) => {
    getAllParishRolService({ page, limit })
      .then((res) => setRole(res.data))
      .catch((error) => console.log(error.messgae))
  }

  const createParishS = async ({ data }) => {
    const { nombre, apellido, direccion, email, telefono, idRol } = data

    const newData = { nombre, apellido, idRol }

    if (direccion?.length) newData.direccion = direccion
    if (email?.length) newData.email = email
    if (telefono?.length) newData.telefono = telefono

    try {
      const res = await createParishServie({ data: newData })

      // await getAllParish({ page: 1, limit: 10 })

      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }

  const onDeleteParish = (id) => deleteParishService(id)

  return {
    parish,
    role,
    getAllParish,
    getAllParishRol,
    createParishS,
    onDeleteParish,
  }
}

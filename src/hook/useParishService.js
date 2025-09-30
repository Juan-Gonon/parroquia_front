/* eslint-disable no-useless-catch */
import React, { useState } from 'react'
import {
  createParishServie,
  deleteParishService,
  getAllParishRolService,
  getAllParishService,
  updateParishService,
} from '../service/parishService'

export const useParishService = () => {
  const [parish, setParish] = useState([])
  const [role, setRole] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    next: null,
    prev: null,
  })

  const getAllParish = async ({
    page = pagination.page,
    limit = pagination.limit,
  }) => {
    try {
      const res = await getAllParishService({ page, limit })
      setParish(res.data)

      setPagination({
        page: res.page,
        limit: res.limit,
        total: res.total,
        next: res.next,
        prev: res.prev,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }

  const getAllParishRol = ({ page, limit }) => {
    getAllParishRolService({ page, limit })
      .then((res) => setRole(res.data))
      .catch((error) => error)
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

  const updateParishS = async ({ data, id }) => {
    const { nombre, apellido, direccion, email, telefono, idRol } = data

    const newData = { nombre, apellido, idRol }

    if (direccion?.length) newData.direccion = direccion
    if (email?.length) newData.email = email
    if (telefono?.length) newData.telefono = telefono
    try {
      if (!id) {
        throw new Error('El id del personal es requerido')
      }

      const res = await updateParishService({ data: newData, id })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const onDeleteParish = (id) => deleteParishService(id)

  return {
    parish,
    role,
    pagination,
    getAllParish,
    getAllParishRol,
    createParishS,
    onDeleteParish,
    updateParishS,
  }
}

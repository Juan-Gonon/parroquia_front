import React, { useState } from 'react'
import {
  createParishServie,
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

  const createParishS = ({ data }) => {
    createParishServie({ data })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }
  return {
    parish,
    role,
    getAllParish,
    getAllParishRol,
    createParishS,
  }
}

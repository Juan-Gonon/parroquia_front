import React, { useState } from 'react'
import {
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
  return {
    parish,
    role,
    getAllParish,
    getAllParishRol,
  }
}

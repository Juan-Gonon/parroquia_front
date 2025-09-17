import React, { useState } from 'react'
import { getAllParishService } from '../service/parishService'

export const useParishService = () => {
  const [parish, setParish] = useState([])

  const getAllParish = ({ page = 1, limit = 10 }) => {
    getAllParishService({ page, limit })
      .then((res) => setParish(res.data))
      .catch((error) => console.log(error.message))
  }
  return {
    parish,
    getAllParish,
  }
}

import { useState } from 'react'
import {
  createMinistryParticipatonService,
  getByMinisteryParticipationService,
} from '../service/ministryPartiService'

export const useMinistryPart = () => {
  const [parishPart, setParishPart] = useState([])
  const onCreateMinistyParS = async ({ data }) => {
    try {
      const res = await createMinistryParticipatonService({ data })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }

  const getByMinistryParticipationS = async ({ id }) => {
    try {
      if (!id) throw new Error('Id requeridad')

      const res = await getByMinisteryParticipationService({ id })

      setParishPart(res)

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    parishPart,
    onCreateMinistyParS,
    getByMinistryParticipationS,
  }
}

import { createMinistryParticipatonService } from '../service/ministryPartiService'

export const useMinistryPart = () => {
  const onCreateMinistyParS = async ({ data }) => {
    try {
      const res = await createMinistryParticipatonService({ data })

      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    onCreateMinistyParS,
  }
}

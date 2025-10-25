import { createAsigEventGrouptService } from '../service/asigGroupEventService'

export const useAsigEventGroup = () => {
  const createAsigEventGrouptS = async ({ data }) => {
    const { notas, ...rest } = data

    const newData = rest

    if (notas?.length) newData.notas = notas
    try {
      const res = await createAsigEventGrouptService({ data: newData })
      return res
    } catch (error) {
      return error || { message: 'Error inesperado' }
    }
  }
  return {
    createAsigEventGrouptS,
  }
}

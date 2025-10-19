import { useCallback, useState } from 'react'
import { getAllTypeIntentionService } from '../service/intentionService'

export const useCatalogIntentionS = () => {
  const [typeIntention, setTypeIntention] = useState()

  const getAllTypeIntentionS = useCallback(async () => {
    const res = await getAllTypeIntentionService()

    setTypeIntention(res)
    return res
  }, [])
  return {
    typeIntention,
    getAllTypeIntentionS,
  }
}

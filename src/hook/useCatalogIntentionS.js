import { useCallback, useState } from 'react'
import {
  getAllStateIntentionService,
  getAllTypeIntentionService,
} from '../service/intentionService'

export const useCatalogIntentionS = () => {
  const [typeIntention, setTypeIntention] = useState([])
  const [stateIntention, setStateIntention] = useState([])

  const getAllTypeIntentionS = useCallback(async () => {
    const res = await getAllTypeIntentionService()

    setTypeIntention(res)
    return res
  }, [])

  const getAllStateIntentionS = useCallback(async () => {
    const res = await getAllStateIntentionService()

    setStateIntention(res)
    return res
  }, [])
  return {
    typeIntention,
    stateIntention,
    getAllTypeIntentionS,
    getAllStateIntentionS,
  }
}

/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom'
import { useEvent } from '../../hook/useEvent'
import { useEffect } from 'react'

export const EventDetailsPage = () => {
  const { id } = useParams()
  const { events, getEventByIdS } = useEvent()
  const navigate = useNavigate()
  // console.log(id)

  useEffect(() => {
    return async () => {
      try {
        await getEventByIdS({ id })
      } catch (error) {
        // console.log(error)
        navigate('/home')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log({
  //   id,
  //   events,
  // })

  return <div>EventDetailsPage</div>
}

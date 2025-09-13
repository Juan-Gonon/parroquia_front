import { useDispatch } from 'react-redux'
import { startLogin } from '../app/auth/authThunks'

export const useAuthStore = () => {
  const dispatch = useDispatch()

  const starLogin = (credentials) => {
    return dispatch(startLogin(credentials))
  }

  return {
    starLogin,
  }
}

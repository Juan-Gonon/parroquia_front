import { useDispatch, useSelector } from 'react-redux'
import { checkAuthToken, startLogin } from '../app/auth/authThunks'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const starLogin = (credentials) => {
    return dispatch(startLogin(credentials))
  }

  const renewLogin = () => {
    return dispatch(checkAuthToken())
  }

  return {
    status,
    user,
    errorMessage,
    starLogin,
    renewLogin,
  }
}

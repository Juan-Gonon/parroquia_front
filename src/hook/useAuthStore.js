import { useDispatch, useSelector } from 'react-redux'
import { checkAuthToken, startLogin } from '../app/auth/authThunks'
import { onLogout } from '../app/auth/authSlice'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const starLogin = (credentials) => {
    return dispatch(startLogin(credentials))
  }

  const renewLogin = () => {
    return dispatch(checkAuthToken())
  }

  const onLogOut = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  return {
    status,
    user,
    errorMessage,
    starLogin,
    renewLogin,
    onLogOut,
  }
}

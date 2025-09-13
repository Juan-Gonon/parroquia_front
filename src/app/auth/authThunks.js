// authThunks.js
import { authService } from '../../service/authService'
import { clearErrorMessage, onChecking, onLogin, onLogout } from './authSlice'

export const startLogin = ({ user, pass }) => {
  return async (dispatch) => {
    dispatch(onChecking())
    try {
      const res = await authService({ user, pass })

      localStorage.setItem('token', res.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin(res))
    } catch (error) {
      dispatch(onLogout(error.message))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 5000)
    }
  }
}

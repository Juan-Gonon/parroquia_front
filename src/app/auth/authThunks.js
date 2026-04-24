// authThunks.js
import { authService, renewAuthService } from '../../service/authService'
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

export const checkAuthToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    try {
      const data = await renewAuthService()

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin(data))
    } catch (error) {
      dispatch(onLogout(error.message))
      localStorage.clear()

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 5000)
    }
  }
}

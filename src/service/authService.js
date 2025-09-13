import parroApi from '../api/api'

export const authService = async ({ user, pass }) => {
  try {
    const res = await parroApi.post('/auth/login', {
      usuario: user,
      password: pass,
    })

    if (res.status !== 200) return

    return res.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

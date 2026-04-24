import parishApi from '../api/api'

export const authService = async ({ user, pass }) => {
  try {
    const res = await parishApi.post('/auth/login', {
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

export const renewAuthService = async () => {
  try {
    const res = await parishApi.get('/auth/renew')

    if (res.status !== 200) return

    const { data } = res

    return data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    throw new Error(error.message || 'Error desconocido')
  }
}

import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnv'

const { VITE_API_URL } = getEnvVariables()

const parroApi = axios.create({
  baseURL: VITE_API_URL,
})

parroApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        ...config.headers,
        'x-token': token,
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default parroApi

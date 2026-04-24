import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnv'

const { VITE_API_URL } = getEnvVariables()

const parishApi = axios.create({
  baseURL: VITE_API_URL,
})

parishApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default parishApi

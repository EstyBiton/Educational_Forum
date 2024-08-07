// import axios from 'axios'

// const axiosInstance = axios.create({ baseURL: 'https://localhost:58030/api' })
// export default axiosInstance

import axios from 'axios'
import { authRequestMiddleware, authResponseMiddleware } from '../components/auth/authMiddleware';

const privateAxiosInstance = axios.create({ baseURL: 'https://localhost:58030/api' })
export const publicAxiosInstance = axios.create({ baseURL: 'https://localhost:58030/api' })

privateAxiosInstance.interceptors.request.use(authRequestMiddleware)
privateAxiosInstance.interceptors.response.use(authResponseMiddleware)

export default privateAxiosInstance;

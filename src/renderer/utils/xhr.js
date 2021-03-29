import axios from 'axios'
let BASE_URL = ''
// console.log(process.env)
if (process.env.NODE_ENV === 'development') {
  BASE_URL = process.env.VUE_APP_API_DEV_ELECTRON
} else {
  BASE_URL = process.env.VUE_APP_API_PRODUCT
  console.log(BASE_URL)
}

// 创建axios实例
const createRequest = (baseURL, successCode = 'ok', returnOrigin = false) => {
  const service = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 15000
  })

  // request 请求拦截器
  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      console.log(error)
      Promise.reject(error)
    }
  )

  // response 拦截器
  service.interceptors.response.use(
    response => {
      const { code, data, status } = response.data
      if (code === successCode || status === 100) {
        return returnOrigin ? response.data : data
      } else {
        return Promise.reject(data)
      }
    },
    error => {
      console.log('err' + error)
      return Promise.reject(error)
    }
  )

  return service
}

export const musicXhr = createRequest(BASE_URL, 200, true)

import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '******' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '0B62AD9814C3DAFC')
  } else {
    config.data = { ...config.data, icode: '******' }
  }
  // 开启页面loading
  return config
})

axios.interceptors.response.use(config => {
  // 关闭页面loading
  return config
}, err => {
  const { error } = err.response.data
  // 提示错误
  // 关闭页面loading
  console.log(error)
})

export default axios
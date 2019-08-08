// 配置一个axios   导出一个配置好的axios

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'
// 进行配置
axios.defaults.baseURL = ' http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [ (data) => {
  // 对 data 进行任意转换处理   data此时是原始数据
  // 后台如果没有返回数据  结果为 null
  // JSONBig.parse 处理为null 的数据时会报错   阻止程序运行
  try {
    return JSONBig.parse(data)
  } catch (e) {
    return data
  }
}]
// 只会执行一次
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 每次请求之前  获取token信息追加在headers中
// 请求拦截器  每次请求之前做一些事情   每次都会执行
axios.interceptors.request.use((config) => {
  //   修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config // return 一下config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use((res) => {
  // 对响应拦截器
  return res
}, (error) => {
  if (error.response.status === 401) {
    // location.hash = '#/login'
    router.push('/login')
  }
  return Promise.reject(error)
})
// 进行导出
export default axios

// 此处编写 axios 封装模块
/* 封装axios用于发送请求 */
// 本模块是基于原本axios创建新的请求实例，配置修改的都是新的请求示例，将来可以创建其他多个请求示例，比如请求基地址不同
import axios from 'axios'
import { Toast } from 'vant'
import { delToken, getToken } from './storage'
// 注意下面这个引路由实例对象只是为了下面的一句router.push()
// 这里一定不能使用this.$router.push()，因为这里是js环境下，this不指向组件实例，而是指向window，所以一定没有this.$router
// 前面说过，router路由实例对象是唯一的，和this.$router指的是一个，所以这里可以引包然后直接使用路由实例对象
import router from '@/router'

// 创建一个新的axios实例
// 创建axios实例的目的是为了不修改axios本体，因为有可能会请求其他基地址，所以可能会出现多个axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/', // 请求基地址
  // 请求基地址的目的是以后写路径只需要写相对路径，会自动和这个基地址进行拼接
  timeout: 5000 // 超时时间
  // 超时时间是如果请求超时了，就不要这个请求了
})

// 添加请求拦截器(请求拦截器是客户端向服务端发请求时，可以在这里设置携带token)
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，统一携带token
  // config就是请求对象，对config的处理，就是对最终发出请求的处理
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器(响应拦截器时服务端返回数据给客户端时，可以在这里去掉一层axios的包装，也可以设置统一错误提示)
request.interceptors.response.use(
  function (response) {
    // 对响应数据去掉了默认的一层axios包装
    return response.data
  },
  function (error) {
    // 如果有错误响应的消息，直接统一给提示
    if (error.response) {
      // token过期了
      if (error.response.status === 401) {
        Toast('登录状态过期，请重新登录！')
        delToken() // 清除token
        router.push('/login')
      } else {
        // 注意这里不能用this.$toast，因为这种用法仅限于this指向组件实例或者vue实例，而这里this在js文件中指向window
        Toast(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

export default request

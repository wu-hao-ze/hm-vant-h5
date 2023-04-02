// 在这里封装请求的函数
import request from '@/utils/request'

// 注意下面三个函数都是函数表达式形式，并且需要匿名函数提供返回值给到前面变量名(也是函数名)
// 注册请求函数
export const register = obj => request.post('/user/register', obj)

// 登录请求函数
export const login = obj => request.post('/user/login', obj)

// 获取用户信息
export const getUserInfo = () => request('/user/currentUser')

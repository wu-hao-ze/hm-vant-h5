import Vue from 'vue'
import VueRouter from 'vue-router'

import { getToken } from '@/utils/storage'
import Layout from '@/views/layout'
// import Detail from '@/views/detail'
// import Register from '@/views/register'
// import Login from '@/views/login'
// import Article from '@/views/article'
// import Collect from '@/views/collect'
// import Like from '@/views/like'
// import User from '@/views/user'

// 异步组件的写法，配合路由使用，该组件不会直接加载，会在路由被解析时才加载
const Detail = () => import('@/views/detail')
const Register = () => import('@/views/register')
const Login = () => import('@/views/login')
const Article = () => import('@/views/article')
const Collect = () => import('@/views/collect')
const Like = () => import('@/views/like')
const User = () => import('@/views/user')

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则表 => 路由表
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/article',
      children: [
        { path: '/article', component: Article },
        { path: '/collect', component: Collect },
        { path: '/like', component: Like },
        { path: '/user', component: User }
      ]
    },
    { path: '/detail/:id', component: Detail },
    { path: '/register', component: Register },
    { path: '/login', component: Login }
  ]
})

// 在每一个路由在真正被访问到之前，都会先经过路由前置导航守卫
// 只有前置导航守卫放行了，才能访问到对应的页面

// 每个路由即将被访问匹配时，都会调用beforeEach的回调函数
// 1.to: 往哪去，要去的路由信息对象（路径，参数...）
// 2.from: 从哪来，从哪个地址过来的（路径，参数...）
// 3.next是否放行
// (1)next() 放行
// (2)next(path) 跳转到path指定的路径

const whiteList = ['/login', '/register']
// 导航守卫存在的意义：可以加拦截判断
// 1.判断用户有没有token，如果有，直接放行
// 2.没有token，要去的是可以直接访问的白名单的页面(登录，注册)，放行
// 3.没有token，要去的还是首页等需要授权的页面，拦截到登录
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    // 数组名.includes(值) => 返回布尔值，用以判断数组中是否存在该值
    // 这里要用path，而不用fullPath，因为fullPath的路径如果有查询参数是会带上的
    if (whiteList.includes(to.path)) {
      next() // 你去吧
    } else {
      // 拦截到登录
      next('/login')
    }
  }
})
export default router

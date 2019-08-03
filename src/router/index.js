// 定义router对象 导出给main.js 使用
import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入路由组件
import login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
//   路由规则 name 的作用是给当前路有规则取名字
// ￥router.push("/login")  或者$router.push({name:"login"})
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
export default router

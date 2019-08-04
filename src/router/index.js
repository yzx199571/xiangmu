// 定义router对象 导出给main.js 使用
import VueRouter from 'vue-router'
import Vue from 'vue'

// 引入路由组件
import login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  //   路由规则 name 的作用是给当前路有规则取名字
  // ￥router.push("/login")  或者$router.push({name:"login"})
  routes: [
    { path: '/login', name: 'login', component: login }, // 登录页
    {
      path: '/', // 首页

      component: Home,
      redirect: '/welcome',
      children: [ // 二级路由 欢迎页面
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
export default router

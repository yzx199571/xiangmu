import Vue from 'vue'
import App from './App.vue'

// 引入element*-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.less' // 全局css样式

// 引入axios
import axios from '@/api'
// 引入路由 @是路由的别名src 只有在脚手架下可以使用
import router from '@/router' // 从api里面导出 处理过的 axios

import mycom from '@/components'
Vue.use(mycom)

Vue.prototype.$http = axios

Vue.use(ElementUI)
// 控制台提示信息  开发环境提示 详细一些
Vue.config.productionTip = false

// main.js的职责
// 1职责导入项目需要的依赖资源（js css文件 其他资源）
// 2职责 创建一个根实例

// 根实例 吧路由挂载到根实例上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

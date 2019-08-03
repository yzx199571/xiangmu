import Vue from 'vue'
import App from './App.vue'
// 控制台提示信息  开发环境提示 详细一些
Vue.config.productionTip = false

// main.js的职责
// 1职责导入项目需要的依赖资源（js css文件 其他资源）
// 2职责 创建一个根实例

// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')

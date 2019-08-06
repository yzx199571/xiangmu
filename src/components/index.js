// 封装一个插件
// 注册所有的component下的组件为全局组件
import Mybread from '@/components/my-bread'
import Mytext from '@/components/my-text'
// vue插件暴露一个对象  对象中由一个选项 install安装的意思
export default {
  install (Vue) {
    //   安装函数  当Vue.use（使用插件）install调用
    // Vue全局的Vue对象
    Vue.component(Mybread.name, Mybread)
    Vue.component(Mytext.name, Mytext)
  }
}

// 存储信息的时候
// 约定信息的key是什么   存储的值是什么
const KEY = 'mydidi'
export default {
  setUser (user) {
    //   存储用户的信息到sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  gitUser () {
    // 获取用户的信息sessionStorage
    return window.sessionStorage.getItem(KEY) || '{}'
  }
}

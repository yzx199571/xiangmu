// 存储信息的时候
// 约定信息的key是什么   存储的值是什么
const KEY = 'mydidi-user'
export default {
  setUser (user) {
    //   存储用户的信息到sessionStorage
    // 现在实现的是 给什么存什么  完整替换
    // 预期目标  局部修改摸一个信息
    const lostUser = this.getUser()
    // 如果登录的时候有可能时空对象{} 有可能是完整的对象
    // 把你想存入的信息 合并到赋给到当前 user对象中
    // 把他们完全展开 后面的user 会覆盖前面的
    const newUser = { ...lostUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    // 获取用户的信息sessionStorage
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

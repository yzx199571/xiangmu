<template>
  <el-select :value="value"  @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>

export default {
  // 注意：当你清空内容的时候 数据变成空字符时   你需要处理成null 否则报错
  // 计算属性使用场景 当你需要一个新数据 需要依赖data中的数据
  // watch 侦听器的使用场景 当你需要监听某一个属性的变换时 去做一些开销较大的操作  异步操作
  // 清除选定操作 使用监听
//   watch: {
//     'reqParmas.channel_id': function (newval, oldval) {
//       if (newval === '') {
//         this.reqParmas.channel_id = null
//       }
//     }
//   },
  name: 'myChannel',
  props: ['value'], // 接收下拉框选定的值
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  created () {
    //  获取频道下拉选项数据、
    this.getchannelOptions()
  },
  methods: {
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels') // 发送请求  解构赋值
      this.channelOptions = data.channels // 赋值给下拉框
    },
    fn (val) {
      // 设置值为空字符的情况
      if (val === '') val = null
      //   把接受的值传递给父组件
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>

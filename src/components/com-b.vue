<template>
<div class='container'>
    B大大  <button @click="fn()">发送b数据</button>
</div>
</template>

<script>
import eventBus from '@/components/eventBus.js'
export default {
  name: 'com-b',
  data () {
    return {
      msg: '我来自b'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>
<style scope  lang='less'>

</style>

<template>
    <div class="container">
      <div class="content">
        <slot name="content" :msg="msg">content</slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'mytext',
  data () {
    return {
      msg: '我是msg'
    }
  }
}
</script>

<style>

</style>

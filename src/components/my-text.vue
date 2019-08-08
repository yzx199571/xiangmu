<template>
    <div class="container">
      <div class="header">
        <slot></slot>
      </div>
      <div slot="content">
        <slot></slot>
      </div>
      <div class="footer">footer</div>
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

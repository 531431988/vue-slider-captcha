<template>
  <div id="app">
    <div class="demo">
      <drag-verify
        ref="dragVerify"
        :isPassing.sync="isPassing"
        text="请按住滑块拖动"
        successText="验证通过"
        handlerIcon="el-icon-d-arrow-right"
        successIcon="el-icon-circle-check"
      ></drag-verify>
      <a-button @click="reset">还原</a-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isPassing: false
    }
  },
  methods: {
    reset () {
      this.isPassing = false
      this.$refs.dragVerify.reset()
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  height: 100vh;
  background: #000;
  .demo {
    user-select: none;
  }
}
</style>

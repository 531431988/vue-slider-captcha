<template>
  <div id="app">
    <a-row type="flex" align="middle" justify="center">
      <a-col>
        <VueSliderCaptcha
          ref="dragVerify"
          src="https://yimijianfang.github.io/vue-drag-verify/static/img/t3.f6f8c53.png"
          :value.sync="value"
          color="#1890ff"
          successText="验证通过"
          @refresh="onRefresh"
          @passcallback="onPassCallBack"
        ></VueSliderCaptcha>
        <a-button type="primary" @click="reset" v-if="value">重置</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import VueSliderCaptcha from '../packages/index'
export default {
  components: {
    VueSliderCaptcha
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
    reset () {
      this.value = false
      this.$refs.dragVerify.reset()
    },
    onRefresh () { },
    onPassCallBack () { }
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
  user-select: none;
}
</style>

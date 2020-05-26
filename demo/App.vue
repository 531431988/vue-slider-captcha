<template>
  <div id="app">
    <a-row type="flex" align="middle" justify="center">
      <a-col>
        <VueSliderCaptcha
          ref="sliderCaptcha"
          :data="data"
          v-model="value"
          color="#1890ff"
          successText="验证通过"
          @on-refresh="onRefresh"
          @on-finish="onFinish"
        ></VueSliderCaptcha>
        <a-button type="primary" @click="$refs.sliderCaptcha.onReset()" v-if="value">重置</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import VueSliderCaptcha from '../packages/index'
import { getImageVerifyCode, verifyImageCode } from '@/api'
export default {
  components: {
    VueSliderCaptcha
  },
  data () {
    return {
      value: false,
      data: null
    }
  },
  created () {
    this.onGetImageVerifyCode()
  },
  methods: {
    async onGetImageVerifyCode () {
      const { code, data, msg } = await getImageVerifyCode({ username: 42 })
      if (code === 200) {
        this.data = data
      } else {
        this.$message.error(msg)
      }
    },
    onFinish (x) {
      verifyImageCode({
        username: '42',
        moveLength: x,
        yHeight: this.data.yHeight
      }).then(res => {
        const { code, msg } = res
        if (code === 200) {
          this.value = true
        } else {
          this.value = false
          this.onGetImageVerifyCode()
          this.$refs.sliderCaptcha.onReset()
          this.$message.error(msg)
        }
      })
    },
    onRefresh () {
      this.onGetImageVerifyCode()
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
  user-select: none;
}
</style>

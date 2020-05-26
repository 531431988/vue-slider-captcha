<template>
  <div id="app">
    <a-row type="flex" align="middle" justify="center">
      <a-col>
        <VueSliderCaptcha
          ref="sliderCaptcha"
          v-model="status"
          color="#1890ff"
          width="100%"
          :src="src"
          :sliderSrc="sliderSrc"
          :y="y"
          @on-refresh="onRefresh"
          @on-finish="onFinish"
        ></VueSliderCaptcha>
        <a-button type="primary" @click="onReset" v-if="status">重置</a-button>
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
      status: false,
      src: '',
      sliderSrc: '',
      y: 0
    }
  },
  created () {
    this.onGetImageVerifyCode()
  },
  methods: {
    async onGetImageVerifyCode () {
      const {
        code, data: {
          bigImage,
          smallImage,
          yHeight,
          reqId
        }, msg
      } = await getImageVerifyCode()
      if (code === 200) {
        this.src = bigImage
        this.sliderSrc = smallImage
        this.y = yHeight
        this.reqId = reqId
      } else {
        this.$message.error(msg)
      }
    },
    onFinish (x) {
      verifyImageCode({
        reqId: this.reqId,
        moveLength: x,
        yHeight: this.y
      }).then(res => {
        const { code, msg } = res
        if (code === 200) {
          this.status = true
        } else {
          this.status = false
          this.onGetImageVerifyCode()
          this.$refs.sliderCaptcha.onReset()
          this.$message.error(msg)
        }
      })
    },
    onRefresh () {
      this.onGetImageVerifyCode()
    },
    onReset () {
      this.onGetImageVerifyCode()
      this.$refs.sliderCaptcha.onReset()
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  color: #fff;
  height: 100vh;
  background: #000;
  user-select: none;
}
</style>

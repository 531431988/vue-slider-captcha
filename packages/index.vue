<template>
  <div class="vue-slider-captcha">
    <div class="vue-slider-captcha-panel">
      <template v-if="src">
        <img id="img" :src="`data:image/png;base64,${src}`" :style="captchaStyle" alt />
        <div class="img-slider" ref="imgSlider" :style="imgSliderStyle">
          <img :src="`data:image/png;base64,${sliderSrc}`" :style="imgStyle" />
        </div>
      </template>
      <RefreshIcon class="refresh" v-if="!this.value" @click="$emit('on-refresh')" />
    </div>
    <div
      class="vue-slider-captcha-control"
      @mousemove="onDragMoving"
      @mouseup="onDragFinish"
      @mouseleave="onDragFinish"
      @touchmove="onDragMoving"
      @touchend="onDragFinish"
    >
      <div
        class="vue-slider-captcha-progress-bar"
        ref="progressBar"
        :style="`background: ${color}`"
      >{{value ? successTip : ''}}</div>
      <div class="vue-slider-captcha-tip" :style="{color: isMoving && '#fff'}">{{value ? '' : tip}}</div>

      <div
        ref="slider"
        class="vue-slider-captcha-slider"
        @mousedown="onDragStart"
        @touchstart="onDragStart"
        style="left:0"
      >
        <svg viewBox="0 0 1024 1024" width="40" height="40" v-if="value">
          <path
            d="M297.472 466.346667a43.136 43.136 0 0 0-35.882667 20.48 31.018667 31.018667 0 0 0 5.12 41.002666c51.2 51.2 102.4 107.605333 158.890667 158.890667 15.36 15.36 35.882667 15.36 56.362667-5.12 76.8-76.8 153.6-153.6 225.493333-230.613333l51.2-51.2a34.133333 34.133333 0 0 0-5.12-51.2 39.424 39.424 0 0 0-51.2 5.12l-25.6 25.6c-71.765333 76.8-148.650667 148.565333-220.202667 225.408-10.24 10.24-10.24 10.24-15.36 0l-117.888-128a28.202667 28.202667 0 0 0-25.813333-10.368z"
            :fill="color"
            p-id="2206"
          />
        </svg>
        <template v-else>
          <slot name="icon" v-if="$slots.icon"></slot>
          <SliderIcon v-else />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import SliderIcon from './slider-icon'
import RefreshIcon from './refresh-icon'

export default {
  name: 'WMDragCaptcha',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: '向右拖动滑块填充拼图'
    },
    successTip: {
      type: String,
      default: '验证通过'
    },
    failTip: {
      type: String,
      default: '拖动滑块将悬浮图像正确合并'
    },
    color: {
      type: String,
      default: '#76c61d'
    },
    width: [String, Number],
    height: [String, Number],
    src: String,
    sliderSrc: String,
    y: Number
  },
  // model: {
  //   // event:什么时候触发v-model行为
  //   evnet: 'change',
  //   // 定义传递给v-model的那个变量，绑定到哪个属性值上
  //   prop: 'value'
  // },
  components: {
    SliderIcon,
    RefreshIcon
  },
  data () {
    return {
      isMoving: false,
      x: 0,
      scale: 1
    }
  },
  created () {
    const width = document.body.offsetWidth
    this.scale = width <= 400 ? 1 - (400 - width) / 400 : 1
  },
  computed: {
    captchaStyle () {
      return {
        width: typeof this.width === 'string' ? this.width : `${this.width}px`,
        height: typeof this.height === 'string' ? this.height : `${this.height}px`
      }
    },
    imgSliderStyle () {
      return {
        height: typeof this.height === 'string' ? this.height : `${this.height}px`,
        transform: `scale(${this.scale})`
      }
    },
    imgStyle () {
      const width = document.body.offsetWidth
      return {
        transform: `translateY(${this.y}px)`
      }
    }
  },
  methods: {
    onDragStart (e) {
      if (!this.value) {
        this.isMoving = true
        const { slider } = this.$refs
        this.x =
          (e.pageX || e.touches[0].pageX) -
          parseInt(slider.style.left.replace('px', ''), 10)
      }
    },
    onDragMoving (e) {
      if (this.isMoving && !this.value) {
        const { slider, imgSlider, progressBar } = this.$refs
        var _x = (e.pageX || e.touches[0].pageX) - this.x
        slider.style.left = _x + 'px'
        progressBar.style.width = _x + 'px'
        imgSlider.style.left = _x + 'px'
      }
    },
    onDragFinish (e) {
      if (this.isMoving && !this.value) {
        const width = document.body.offsetWidth
        var x = (e.pageX || e.changedTouches[0].pageX) - this.x
        this.$emit('on-finish', width <= 400 ? x / this.scale : x)
        this.isMoving = false
      }
    },
    onReset () {
      // 将vlaue更新到父级
      // this.$emit('update:value', false)
      this.$emit('input', false)
      const { slider, imgSlider, progressBar } = this.$refs
      slider.style.left = '0'
      imgSlider.style.left = '0'
      progressBar.style.width = '0'
    }
  }
}
</script>
<style lang="less" scoped>
@color: #666;
.vue-slider-captcha {
  &-panel {
    position: relative;
    overflow: hidden;
    .img-slider {
      position: absolute;
      z-index: 100;
      top: 0;
      width: 55px;
      img {
        position: absolute;
        top: 0;
        filter: drop-shadow(1px 1px 1px black);
      }
    }
    .refresh {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    .tips {
      position: absolute;
      bottom: 0;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 100%;
      font-size: 12px;
      z-index: 200;
      background: rgba(0, 0, 0, 0.6);
      color: yellow;
    }
  }
  &-control {
    position: relative;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: rgb(238, 238, 238);
    overflow: hidden;
  }
  &-slider {
    position: absolute;
    top: 0px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    cursor: move;
  }
  &-progress-bar {
    position: absolute;
    height: 40px;
    width: 0px;
    color: #fff;
  }
  &-tip {
    position: absolute;
    top: 0px;
    right: 0;
    left: 0;
    color: @color;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, @color),
      color-stop(0.4, @color),
      color-stop(0.5, #fff),
      color-stop(0.6, @color),
      color-stop(1, @color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slidetounlock 3s infinite;
  }
}
.vue-slider-captcha {
  position: relative;
  line-height: 0;
}

.refresh {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
  z-index: 200;
}
.tips {
  position: absolute;
  bottom: 0;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  z-index: 200;
}
@keyframes slidetounlock {
  0% {
    background-position: -250px 0;
  }
  100% {
    background-position: 250px 0;
  }
}
</style>

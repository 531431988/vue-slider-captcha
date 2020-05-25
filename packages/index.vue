<template>
  <div class="vue-slider-captcha">
    <div class="vue-slider-captcha-panel">
      <img ref="checkImg" :src="src" @load="checkimgLoaded" style="width:100%" alt />
      <div
        class="move-bar"
        :class="{goFirst:isOk, goKeep:isKeep}"
        :style="movebarStyle"
        ref="moveBar"
        v-show="showBar"
      ></div>
      <div class="clip-bar" :style="clipbarStyle" ref="clipBar"></div>
      <RefreshIcon class="refresh" v-if="!this.value" @click="$emit('on-refresh')" />
      <div class="tips" v-if="!value && showErrorTip">{{failTip}}</div>
    </div>
    <div
      ref="control"
      class="vue-slider-captcha-control"
      @mousemove="dragMoving"
      @mouseup="dragFinish"
      @mouseleave="dragFinish"
      @touchmove="dragMoving"
      @touchend="dragFinish"
    >
      <div
        class="vue-slider-captcha-progress-bar"
        :class="{goFirst2: isOk}"
        ref="progressBar"
        :style="progressBarStyle"
      >{{value ? successText : ''}}</div>
      <div
        class="vue-slider-captcha-tip"
        :style="{color: isMoving && '#fff'}"
        ref="message"
      >{{value ? '' : text}}</div>

      <div
        ref="slider"
        class="vue-slider-captcha-slider"
        :class="{goFirst:isOk}"
        @mousedown="dragStart"
        @touchstart="dragStart"
        :style="sliderStyle"
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
    width: {
      type: Number,
      default: 250
    },
    text: {
      type: String,
      default: '向右拖动滑块填充拼图'
    },
    successText: {
      type: String,
      default: '验证通过'
    },
    color: {
      type: String,
      default: '#76c61d'
    },
    src: {
      type: String
    },
    failTip: {
      type: String,
      default: '拖动滑块将悬浮图像正确合并'
    },
    diff: {
      type: Number,
      default: 10
    }
  },
  model: {
    // event:什么时候触发v-model行为
    evnet: 'change',
    // 定义传递给v-model的那个变量，绑定到哪个属性值上
    prop: 'value'
  },
  components: {
    SliderIcon,
    RefreshIcon
  },
  computed: {
    sliderStyle () {
      return {
        left: '0px'
      }
    },
    progressBarStyle () {
      return {
        background: this.color
      }
    }
  },
  data () {
    return {
      isMoving: false,
      x: 0,
      isOk: false,
      isKeep: false,
      movebarStyle: {},
      clipbarStyle: {},
      showBar: false,
      clipBarx: 0,
      showErrorTip: false
    }
  },
  methods: {
    checkimgLoaded () {
      // 生成图片缺失位置
      var barWidth = 40
      var imgHeight = this.$refs.checkImg.height
      var halfWidth = Math.floor(this.width / 2)
      var refreshHeigth = 25
      var tipHeight = 20
      var x = halfWidth + Math.ceil(Math.random() * (halfWidth - barWidth))
      var y = refreshHeigth + Math.floor(Math.random() * (imgHeight - refreshHeigth - tipHeight))
      this.clipbarStyle = {
        width: barWidth + 'px',
        top: y + 'px',
        left: x + 'px'
      }
      this.clipBarx = x
      var src = this.src
      var width = this.width
      this.movebarStyle = {
        display: 'block',
        background: `url(${src})`,
        'background-position': `-${x}px -${y}px`,
        'background-size': `${width}px`,
        top: y + 'px',
        left: '0px'
      }
    },
    dragStart (e) {
      if (!this.value) {
        this.isMoving = true
        var slider = this.$refs.slider
        this.x =
          (e.pageX || e.touches[0].pageX) -
          parseInt(slider.style.left.replace('px', ''), 10)
      }
      this.showBar = true
      this.showErrorTip = false
      this.$emit('handlerMove')
    },
    dragMoving (e) {
      if (this.isMoving && !this.value) {
        var _x = (e.pageX || e.touches[0].pageX) - this.x
        var slider = this.$refs.slider
        slider.style.left = _x + 'px'
        this.$refs.progressBar.style.width = _x + 'px'
        this.$refs.moveBar.style.left = _x + 'px'
      }
    },
    dragFinish (e) {
      if (this.isMoving && !this.value) {
        var _x = (e.pageX || e.changedTouches[0].pageX) - this.x
        if (Math.abs(_x - this.clipBarx) > this.diff) {
          this.isOk = true
          var that = this
          setTimeout(function () {
            that.$refs.slider.style.left = '0'
            that.$refs.progressBar.style.width = '0'
            that.$refs.moveBar.style.left = '0'
            that.isOk = false
          }, 500)
          this.showErrorTip = true
        } else {
          this.passVerify()
        }
        this.isMoving = false
      }
    },
    passVerify () {
      this.$emit('update:value', true)
      // this.$emit('change', true)
      this.isMoving = false
      this.isKeep = true
      setTimeout(() => {
        this.$refs.moveBar.style.left = this.clipBarx + 'px'
        setTimeout(() => {
          this.isKeep = false
        }, 200)
      }, 100)
      this.$emit('passcallback')
    },
    reset () {
      this.reImg()
      this.checkimgLoaded()
    },
    reImg () {
      this.$emit('update:value', false)
      const oriData = this.$options.data()
      for (const key in oriData) {
        if (oriData.hasOwnProperty(key)) {
          this.$set(this, key, oriData[key])
        }
      }
      var slider = this.$refs.slider
      slider.style.left = '0'
      this.$refs.progressBar.style.width = '0'
      this.$refs.moveBar.style.left = '0px'
    }
  },
  watch: {
    src: {
      immediate: false,
      slider: function () {
        this.reImg()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@color: #666;
.vue-slider-captcha {
  width: 250px;
  &-panel {
    position: relative;
    overflow: hidden;
    .move-bar {
      z-index: 100;
    }
    .move-bar,
    .clip-bar {
      width: 40px;
      height: 40px;
      position: absolute;
    }
    .clip-bar {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
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
    left: 0px;
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

.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goKeep {
  transition: left 0.2s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
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
@keyframes slidetounlock2 {
  0% {
    background-position: -250px 0;
  }
  100% {
    background-position: 250px 0;
  }
}
</style>

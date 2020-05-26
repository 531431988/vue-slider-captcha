<template>
  <div :class="{'ant-loading-nested-loading': spinning}">
    <div>
      <div
        v-if="spinning || !$slots.default"
        class="ant-loading ant-loading-lg ant-loading-spinning"
      >
        <span class="ant-loading-dot ant-loading-dot-spin">
          <i
            class="ant-loading-dot-item"
            v-for="item in 4"
            :key="item"
            :style="`background: ${color}`"
          ></i>
        </span>
        <p class="ant-loading-text" :style="`color:${color}`">{{tip}}</p>
      </div>
    </div>
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<script>
export default {
  props: {
    spinning: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: '玩命加载中'
    },
    color: {
      type: String,
      default: '#1890ff'
    }
  }
}
</script>

<style lang="less" scoped>
.ant-loading {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  &-spinning {
    position: static;
    display: inline-block;
    opacity: 1;
  }
  &-nested-loading {
    position: relative;
    .ant-loading {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      display: block;
      width: 100%;
      height: 100%;
      max-height: 400px;
      .ant-loading-text {
        position: absolute;
        top: 50%;
        width: 100%;
        padding-top: 15px;
        text-shadow: 0 1px 2px #fff;
      }
      .ant-loading-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -21px -16px -16px;
      }
    }
  }
  .ant-loading-dot {
    position: relative;
    display: inline-block;
    font-size: 32px;
    width: 1em;
    height: 1em;
    i {
      width: 14px;
      height: 14px;
    }
  }
  .ant-loading-dot-item {
    position: absolute;
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 100%;
    transform: scale(0.75);
    transform-origin: 50% 50%;
    opacity: 0.3;
    animation: antSpinMove 1s infinite linear alternate;
    &:nth-child(1) {
      top: 0;
      left: 0;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.4s;
    }
    &:nth-child(3) {
      right: 0;
      bottom: 0;
      animation-delay: 0.8s;
    }
    &:nth-child(4) {
      bottom: 0;
      left: 0;
      animation-delay: 1.2s;
    }
  }
  .ant-loading-dot-spin {
    transform: rotate(45deg);
    animation: antRotate 1.2s infinite linear;
  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE10+ */
  .ant-loading-blur {
    background: #fff;
    opacity: 0.5;
  }
}
@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}
@keyframes antRotate {
  to {
    transform: rotate(405deg);
  }
}
</style>

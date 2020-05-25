import Vue from 'vue'
import App from './App.vue'
import '@/plugins/ant-design-vue'
// 基本滑块验证组件
import dragVerify from '../packages/dragVerify'
// 图片滑块组件
import dragVerifyImg from '../packages/dragVerifyImg'
// 旋转图片滑块组件
import dragVerifyImgRotate from '../packages/dragVerifyImgRotate'
Vue.component(dragVerify.name, dragVerify)
Vue.component(dragVerifyImg.name, dragVerifyImg)
Vue.component(dragVerifyImgRotate.name, dragVerifyImgRotate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

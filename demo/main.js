import Vue from 'vue'
import App from './App.vue'
import '@/plugins/ant-design-vue'
import { VueAxios } from '@/libs/request'
Vue.config.productionTip = false
Vue.use(VueAxios)
new Vue({
  render: h => h(App)
}).$mount('#app')

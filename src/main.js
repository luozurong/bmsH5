import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/common/css/reset.css'
import "@/common/js/fontSize.js"

import '@/common/lxjTip/lxjTip.css'
import "@/common/lxjTip/lxjTip.js"

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './css/main.scss'
// 仅在开发环境下使用mock
console.log(process.env)
process.env.NODE_ENV === 'development' && require('@/mock')

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

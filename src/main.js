import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { formatNum } from '@/utils/formatNum.js'
import './plugins/axios'
import './plugins/element.js'
import './plugins/chart.js'
import './components/index'
import './api/api.js'
import './assets/style/index.scss'

Vue.config.productionTip = false
Vue.prototype.$formatNum = formatNum

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

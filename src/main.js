// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 这是按需引入
import {
  Button,
  Select,
  Container,
  Header,
  Main
} from 'element-ui'
// import ElementUI from 'element-ui' 完整引入时打开
// import 'element-ui/lib/theme-chalk/index.css' 完整引入时打开
import App from './App'
import router from './router'
import store from './store'
import './css/main.scss'

// 全部引入时打开
// Vue.use(ElementUI)

// 按需加载，减少项目体积，请对应页面所需的组件并在此处逐步添加
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

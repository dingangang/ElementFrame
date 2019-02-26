import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: to => {
        return '/demo'
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import(/* webpackChunkName: "demo" */ './views/Demo/index')
    },
    // 404,请保持在最后
    {
      path: '*',
      component: () => import(/* webpackChunkName: "error" */ './views/Error404/index')
    }
  ]
})

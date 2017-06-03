// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './scss/main.scss'

// mint-ui
// import Mintui from 'mint-ui'
// import 'mint-ui/lib/style.css'

// 自定义全局组件
import comLoading from './components/com-loading' // 页面loading组件
import comErr from './components/com-err'  // 页面网络错误组件
Vue.component('com-loading', comLoading)
Vue.component('com-err', comErr)

// 注册全局过滤器
import * as filters from './utils/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器

// Vue.use(Mintui)

// 登录检测
router.beforeEach(({meta, path}, from, next) => {
  const {auth = false} = meta
  const isLogin = Boolean(store.getters.getUser)  // 检测用户是否已经登录
  if (auth && !isLogin && path !== '/login') {
    let to = {path: '/login'}
    return next(to)  // 中断导航，跳转到登录界面
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  ...App
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import cover from '../view/cover'   // 封面
import Index from '../view/index'   // 首页
import topic from '../view/topic'   // 主题页
import userInfo from '../view/user-info'  // 用户信息
import about from '../view/about'  // 关于页面
import login from '../view/login'  // 登录页面
import submit from '../view/submit'  // 发布新主题

export default new Router({
  mode: 'history',
  routes: [
    // cover route
    {
      path: '/',
      name: 'cover',
      component: cover
    },
    // index route
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    // topic info route
    {
      path: '/topic/:id',
      name: 'topic',
      component: topic
    },
    // user info route
    {
      path: '/user-info/:name',
      name: 'user-info',
      component: userInfo
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit
    }

  ],
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

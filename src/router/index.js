import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '../view/index'   // 首页
import topic from '../view/topic'   // 主题页
import userInfo from '../view/user-info'  // 用户信息
import collectTopic from '../view/collect-topic'  // 用户收藏
import about from '../view/about'  // 关于页面
import login from '../view/login'  // 登录页面
import submit from '../view/submit'  // 发布新主题
import message from '../view/message'  // 消息页面

export default new Router({
  mode: 'history',
  routes: [
    // index route
    {
      path: '/',
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
      path: '/user-info/collect',
      name: 'collectTopic',
      component: collectTopic,
      meta: {
        auth: true
      }
    },
    {
      path: '/user-info/message',
      name: 'message',
      component: message,
      meta: {
        auth: true
      }
    },
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
    },
    {
      path: '*', // 其他页面
      redirect: '/'
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

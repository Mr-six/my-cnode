/*
* 通用的配置，例如顶部一栏
*/
import * as types from '../mutation-types'

const state = {
  left: true,   // 左侧
  menu: false,  // 左侧菜单按钮
  back: true,   // 左侧返回按钮
  title: '全部',    // 头部标题
  right: true, // 右侧
  showGoTop: false,  // 返回顶部
  plus: true,  // 添加主题
  logout: false,  // 退出登录
  aside_left: false,  // 侧边菜单
  show_aside: false,  // 侧边栏开
  hide_aside: true,  // 侧边栏关
  loading: false,  // 显示loading层
  err: false,  // 数据加载出错
  errMes: '网络连接失败'
}

const actions = {
  commConf ({ commit }, settings) {
    commit(types.COMM_CONF, settings)
  },
  showAside ({ commit }) {
    commit(types.SHOW_ASIDE)
  },
  hideAside ({ commit }) {
    commit(types.HIDE_ASIDE)
  }
}

const getters = {
  commConf: state => state,
  showSsideLeft: state => state.aside_left,
  showAside: state => state.show_aside,
  hideAside: state => state.hide_aside
}

const mutations = {
  [types.COMM_CONF] (state, settings) {
    state = Object.assign(state, settings)
  },
  [types.SHOW_ASIDE] (state) {
    state.show_aside = !state.show_aside
  },
  [types.HIDE_ASIDE] (state) {
    state.hide_aside = !state.hide_aside
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import comm from './modules/comm'

Vue.use(Vuex)

const state = {
  user: JSON.parse(localStorage.getItem('user')) || {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // 公共状态（如头部标题）
  modules: {
    comm
  }
})

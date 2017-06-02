/**
 * mutatiosns 必须为同步函数
 * 为了使Vue能够监听到对象属性的添加，使用 Object.assign() 创建新对象的方式
 */
import * as types from './mutation-types'

export default {
  // 获取用户信息
  [types.USER_SIGNIN] (state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = Object.assign(state.user, user)
  },
  // 用户登出，清空信息
  [types.USER_SIGNOUT] (state) {
    localStorage.removeItem('user')
    state = Object.assign(state, {user: {}})
  }
}

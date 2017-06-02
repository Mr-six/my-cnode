import * as types from './mutation-types'

export default {
  singIn ({ commit }, user) {
    commit(types.USER_SIGNIN, user)
  },
  singOut ({ commit }) {
    commit(types.USER_SIGNOUT)
  }
}

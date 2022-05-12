import { userService } from '@/services/userService'
import tokenHelper from '@/shared/tokenHelper'

const state = {
  trails: [],
  onError: false
}

const getters = {
  getUserLikes: state => id => {
    const likes = state.user.find(post => post.id === id)
    return likes
  },
  getCurrentUserId: (state) => {
    return tokenHelper.getUserId(state)
  }
}

const mutations = {
  incrementLikeCount (state, trailId) {
    this.getCurrentUserId(state)
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async likeTrail ({ commit }, id) {
    try {
      commit('incrementLikeCount')
      await userService.likeTrail(likeInfo)
    } catch (error) {
      commit('setOnError')
    }
  },
  async removeLikeTrail ({ commit }, id) {
    try {
      await userService.removeLikeTrail(id)
    } catch (error) {
      commit('setOnError')
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

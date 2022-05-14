import { userService } from '@/services/userService'

const state = {
  userlikes: [],
  likeInfos: {},
  onError: false
}

const getters = {
  getUserLikes: state => {
    return state.userlikes
  },
  getLikeInfos: state => {
    return state.likeInfos
  }
}

const mutations = {
  setOnError (state) {
    state.onError = true
  },
  initialiseLikeInfos (state) {
    state.likeInfos = {
      userId: this.$store.getters['authentification/getTokenUserId'],
      trailId: this.$store.getters['trails/getSelectedTrailId']
    }
  }
}

const actions = {
  async likeTrail ({ commit }) {
    try {
      await userService.likeTrail(this.likeInfos)
    } catch (error) {
      commit('setOnError')
    }
  },
  async removeLikeTrail ({ commit }) {
    try {
      await userService.removeLikeTrail(this.likeInfos.userId)
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

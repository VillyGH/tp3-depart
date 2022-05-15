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
  },
  isTrailLiked: state => {
    return state.userlikes
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
  async likeTrailAction ({ commit }) {
    try {
      await userService.likeTrail(this.likeInfos)
    } catch (error) {
      commit('setOnError')
    }
  },
  async removeLikeTrailAction ({ commit }) {
    try {
      await userService.removeLikeTrail(this.likeInfos.userId)
    } catch (error) {
      commit('setOnError')
    }
  },
  async getUserLikesAction ({ commit }) {
    try {
      await userService.getUserLikes(this.likeInfos.userId)
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

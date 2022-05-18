import { userService } from '@/services/userService'

const state = {
  userlikes: [],
  likeInfos: {},
  isTrailLiked: false,
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
    return state.isTrailLiked
  }
}

const mutations = {
  initialiseUserLikes: (state, likes) => {
    state.userlikes = likes
    state.onError = false
    console.log('Step 3')
  },
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
  async getUserLikesAction ({ commit }) {
    try {
      const likes = await userService.getUserLikes(this.likeInfos.userId)
      commit('initialiseUserLikes', likes)
    } catch (error) {
      commit('setOnError')
    }
  },
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

import { userService } from '@/services/userService'
import { trailService } from '@/services/trailService'

const state = {
  trailLikes: [],
  nbTrailLikes: 0,
  isTrailLiked: false,
  onError: false
}

const getters = {
  getNbTrailLikes: state => {
    return state.nbTrailLikes
  },
  isTrailLiked: state => {
    return state.isTrailLiked
  }
}

const mutations = {
  countNbTrailLikes: (state, likes) => {
    state.nbTrailLikes = likes.length
    state.likes = likes
    state.onError = false
  },
  checkIfTrailLiked: (state, userId) => {
    console.log(userId)
    state.likes.array.forEach(like => {
      if (like.userId === userId) {
        state.isTrailLiked = true
      }
    })
  },
  setTrailLiked: (state, value) => {
    state.isTrailLiked = value
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
/*   async getUserLikesAction ({ commit, rootGetters }) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const likes = await userService.getUserLikes(userId)
      commit('initialiseUserLikes', likes)
    } catch (error) {
      commit('setOnError')
    }
  }, */
  async getTrailLikesAction ({ commit, rootGetters }, trailId) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const likes = await trailService.getTrailLikes(trailId)
      commit('countNbTrailLikes', likes)
      commit('checkIfTrailLiked', userId)
    } catch (error) {
      commit('setOnError')
    }
  },
  async likeTrailAction ({ commit, rootGetters }) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const trailId = rootGetters['trails/getSelectedTrailId']
      await userService.likeTrail(userId, trailId)
      commit('setTrailLiked', true)
    } catch (error) {
      commit('setOnError')
    }
  },
  async removeLikeTrailAction ({ commit, rootGetters }) {
    try {
      if (state.nbTrailLikes !== 0) {
        const userId = rootGetters['authentication/getTokenUserId']
        await userService.removeLikeTrail(userId)
        commit('setTrailLiked', false)
      }
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

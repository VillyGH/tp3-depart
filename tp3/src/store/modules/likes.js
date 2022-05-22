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
  initiateTrailLikes: (state, likes) => {
    state.likes = likes
    state.nbTrailLikes = state.likes.length
    state.onError = false
  },
  checkIfTrailLiked: (state, userId) => {
    state.likes.forEach(like => {
      if (like.userId === parseInt(userId)) {
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
  async getTrailLikesAction ({ commit, rootGetters }, trailId) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const likes = await trailService.getTrailLikes(trailId)
      console.log(likes)
      commit('initiateTrailLikes', likes)
      commit('checkIfTrailLiked', userId)
    } catch (error) {
      commit('setOnError')
    }
  },
  async likeTrailAction ({ commit, rootGetters }) {
    try {
      const userId = parseInt(rootGetters['authentication/getTokenUserId'])
      const trailId = rootGetters['trails/getSelectedTrail'].id
      await userService.likeTrail(userId, trailId)
      commit('setTrailLiked', true)
    } catch (error) {
      commit('setOnError')
    }
  },
  async removeUserLikeAction ({ commit, rootGetters }) {
    try {
      if (state.nbTrailLiked !== 0) {
        const userId = parseInt(rootGetters['authentication/getTokenUserId'])
        await userService.removeLUserike(userId)
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

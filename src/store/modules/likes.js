import { userService } from '@/services/userService'
import { trailService } from '@/services/trailService'
import uiTextPlugin from '../../externalization/uiTextPlugin'

const state = {
  likes: [],
  trailName: '',
  nbTrailLiked: 0,
  isTrailLiked: false,
  imgLikeUrl: uiTextPlugin.imageLikeEmptyUrl,
  lastUserLikeId: 0,
  confirmationMessage: '',
  errorMessage: ''
}

const getters = {
  getLikes: state => {
    return state.likes
  },
  getNbTrailLiked: state => {
    return state.nbTrailLiked
  },
  isTrailLiked: state => {
    return state.isTrailLiked
  },
  getImgLikeUrl: state => {
    return state.imgLikeUrl
  },
  getLastUserLikeId: state => {
    return state.lastUserLikeId
  },
  getConfirmationMessage: state => {
    return state.confirmationMessage
  }
}

const mutations = {
  initiateTrailLikes: (state, likes) => {
    state.likes = likes
    state.nbTrailLiked = state.likes.length
    state.onError = false
  },
  checkIfTrailLiked: (state, userId) => {
    state.isTrailLiked = false
    state.likes.forEach(like => {
      if (like.userId === parseInt(userId)) {
        state.isTrailLiked = true
        state.imgLikeUrl = uiTextPlugin.imageLikeFilledUrl
        state.lastUserLikeId = like.id
      }
    })
    if (state.isTrailLiked === false) {
      state.imgLikeUrl = uiTextPlugin.imageLikeEmptyUrl
    }
  },
  addConfirmationMessage (state, trailName) {
    if (!state.isTrailLiked) {
      state.confirmationMessage = uiTextPlugin.likeConfirmationMessage + trailName
    } else {
      state.confirmationMessage = uiTextPlugin.removeLikeConfirmationMessage + trailName
    }
  },
  setOnError (state, error) {
    state.onError = error
  }
}

const actions = {
  async getTrailLikesAction ({ commit, rootGetters }, trailId) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const likes = await trailService.getTrailLikes(trailId)
      commit('initiateTrailLikes', likes)
      commit('checkIfTrailLiked', userId)
    } catch (error) {
      commit('setOnError', error)
    }
  },
  async likeTrailAction ({ commit, rootGetters, dispatch }) {
    try {
      const trail = rootGetters['trails/getSelectedTrail']
      const userId = parseInt(rootGetters['authentication/getTokenUserId'])
      await userService.likeTrail(userId, trail.id)
      commit('addConfirmationMessage', trail.name)
      dispatch('getTrailLikesAction', trail.id)
    } catch (error) {
      commit('setOnError', error)
    }
  },
  async removeUserLikeAction ({ commit, rootGetters, getters, dispatch }) {
    try {
      const trail = rootGetters['trails/getSelectedTrail']
      await userService.removeUserLike(getters.getLastUserLikeId)
      commit('addConfirmationMessage', trail.name)
      dispatch('getTrailLikesAction', trail.id)
    } catch (error) {
      commit('setOnError', error)
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

import { trailService } from '@/services/trailService'
import tokenHelper from '@/shared/tokenHelper'

const state = {
  trails: [],
  onError: false
}

const getters = {
  getTrailById: state => id => {
    const trail = state.posts.find(post => post.id === id)
    return trail
  },
  getTrails: state => {
    return state.trails
  }
}

const mutations = {
  initialiseTrails: (state, trails) => {
    state.trails = trails
    state.onError = false
  },
  updateTrail: (state, trail) => {
    const index = state.trails.findIndex(t => t.id === trail.id)
    state.trails.splice(index, 1, trail)
    state.trails = [...state.trails]
  },

  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async getAllTrailAction ({ commit }) {
    try {
      const trails = await trailService.getTrails()
      console.log(trails)
      commit('initialiseTrails', trails)
    } catch (error) {
      commit('setOnError')
    }
  },
  async likeTrail ({ commit }, id) {
    try {
      commit('initialiseTrails', trails)
      await userService.likeTrail(id)
    } catch (error) {
      commit('setOnError')
    }
  },
  async deleteTrail ({ commit }, id) {
    try {
      await userService.deleteTrail(id)
    } catch (error) {
      commit('setOnError')
    }
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

import { trailService } from '@/services/trailService'

const state = {
  trails: [],
  currentTrailId: 0,
  currentSegments: [],
  onError: false
}

const getters = {
  getTrailById: state => id => {
    const trail = state.trails.find(trail => trail.id === id)
    return trail
  },
  getTrails: state => idOfPark => {
    const trailList = state.trails.filter(function (trail) {
      return trail.parkId === idOfPark
    })
    return trailList
  },
  getCurrentParkTrailId: state => {
    return state.currentTrailId
  },
  getCurrentTrailSegments: state => {
    return state.currentSegments;
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
  initialiseSegments: (state, segments) => {
    state.currentSegments = segments
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async getAllTrailAction ({ commit }) {
    try {
      const trails = await trailService.getTrails()
      commit('initialiseTrails', trails)
    } catch (error) {
      commit('setOnError')
    }
  },
  async getTrailSegmentsAction ({ commit }) {
    try {
      const segments = await trailService.getTrailSegments(this.currentTrailId)
      commit('setSegments', segments)
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

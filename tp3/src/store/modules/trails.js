import { trailService } from '@/services/trailService'

const state = {
  trails: [],
  selectedTrail: {},
  trailSegments: [],
  onError: false
}

const getters = {
  getTrailById: state => id => {
    const trail = state.trails.find(trail => trail.id === id)
    return trail
  },
  getTrails: state => {
    return state.trails
  },
  getSelectedTrail: state => {
    return state.selectedTrail
  },
  getTrailSegments: state => {
    return state.trailSegments
  }
}

const mutations = {
  initialiseTrails: (state, trails) => {
    state.trails = trails
    state.onError = false
  },
  saveTrail (state, trail) {
    console.log(trail)
    state.selectedTrail = trail
  },
  updateTrail: (state, trail) => {
    const index = state.trails.findIndex(t => t.id === trail.id)
    state.trails.splice(index, 1, trail)
    state.trails = [...state.trails]
  },
  initialiseSegments: (state, segments) => {
    state.trailSegments = segments
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async getAllParkTrailsAction ({ commit, rootGetters }) {
    try {
      console.log(rootGetters['parks/getSelectedPark'].id)
      const trails = await trailService.getParkTrails(rootGetters['parks/getSelectedParkId'].id)
      commit('initialiseTrails', trails)
    } catch (error) {
      commit('setOnError')
    }
  },
  async getTrailSegmentsAction ({ commit }) {
    try {
      const segments = await trailService.getTrailSegments(this.selectedTrailId)
      commit('initialiseSegments', segments)
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

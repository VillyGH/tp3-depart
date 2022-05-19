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
  },
  getSelectedPark () {
    return state.selectedPark
  }
}

const mutations = {
  initialiseTrails: (state, trails) => {
    state.trails = trails
    state.onError = false
  },
  saveTrail (state, trail) {
    console.log(trail.id)
    state.selectedTrail = trail
  },
  savePark (state, park) {
    state.selectedPark = park
    console.log(state.selectedPark.id)
    state.onError = false
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
  async getAllParkTrailsAction ({ commit, rootGetters }, id) {
    try {
      // const selectedPark = rootGetters['parks/getSelectedPark']
      const trails = await trailService.getParkTrails(id)
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

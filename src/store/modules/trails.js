import { trailService } from '@/services/trailService'
import uiTextPlugin from '../../externalization/uiTextPlugin'

const state = {
  trails: [],
  selectedTrail: {},
  selectedPark: {},
  trailSegments: [],
  errorMessage: ''
}

const getters = {
  getTrails: state => {
    return state.trails
  },
  getSelectedTrail: state => {
    return state.selectedTrail
  },
  getTrailSegments: state => {
    return state.trailSegments
  },
  getErrorMessage: state => {
    return state.errorMessage
  }
}

const mutations = {
  initialiseTrails: (state, trails) => {
    state.trails = trails
    if (trails.length === 0) {
      state.errorMessage = uiTextPlugin.noTrailsAvailableMessage
    } else {
      state.errorMessage = ''
    }
  },
  saveTrail (state, trail) {
    state.selectedTrail = trail
  },
  initialiseSegments: (state, segments) => {
    state.trailSegments = segments
    state.errorMessage = ''
  },
  setOnError (state, error) {
    state.errorMessage = error
  }
}

const actions = {
  async getAllParkTrailsAction ({ commit }, id) {
    try {
      const trails = await trailService.getParkTrails(id)
      commit('initialiseTrails', trails)
    } catch (error) {
      commit('setOnError', error)
    }
  },
  async getTrailSegmentsAction ({ commit }, id) {
    try {
      const segments = await trailService.getTrailSegments(id)
      commit('initialiseSegments', segments)
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

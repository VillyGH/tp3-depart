import { parkService } from '@/services/parkService'

const state = {
  parks: [],
  selectedPark: {},
  errorMessage: ''
}

const getters = {
  getParkById: state => id => {
    const park = state.parks.find(park => park.id === id)
    return park
  },
  getParks: state => {
    return state.parks
  },
  getSelectedPark: state => {
    return state.selectedPark
  },
  getErrorMessage: state => {
    return state.errorMessage
  }
}

const mutations = {
  initialiseParks: (state, parks) => {
    state.parks = parks
    state.errorMessage = ''
  },
  savePark (state, park) {
    state.selectedPark = park
    state.errorMessage = ''
  },
  setOnError (state, error) {
    state.errorMessage = error
  }
}

const actions = {
  async getAllParkAction ({ commit }) {
    try {
      const parks = await parkService.getParks()
      commit('initialiseParks', parks)
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

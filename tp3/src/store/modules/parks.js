import { parkService } from '@/services/parkService'

const state = {
  parks: [],
  selectedParkId: 0,
  parkServiceError: '',
  onError: false
}

const getters = {
  getParkById: state => id => {
    const park = state.parks.find(park => park.id === id)
    return park
  },
  getParks: state => {
    return state.parks
  },
  getSelectedParkId () {
    // console.log(state.selectedParkId)
    return state.selectedParkId
  }
}

const mutations = {
  initialiseParks: (state, parks) => {
    state.parks = parks
    state.onError = false
  },
  saveParkId (state, id) {
    state.selectedParkId = id
    console.log(state.selectedParkId)
    state.onError = false
  },
  updatePark: (state, park) => {
    const index = state.parks.findIndex(t => t.id === park.id)
    state.parks.splice(index, 1, park)
    state.parks = [...state.parks]
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async getAllParkAction ({ commit }) {
    try {
      console.log('Step 1')
      const parks = await parkService.getParks()
      commit('initialiseParks', parks)
    } catch (error) {
      // Il n'est pas nécessaire de relancer l'exception. Ce qui importe c'est que le composant soit informé que l'état de postStore est en erreur.
      console.log(error)
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

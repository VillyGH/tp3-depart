import { parkService } from '@/services/parkService'

const state = {
  parks: [],
  selectedParkId: 0,
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
    return state.selectedParkId
  }
}

const mutations = {
  initialiseParks: (state, parks) => {
    state.parks = parks
    state.onError = false
  },
  updatePark: (state, park) => {
    const index = state.parks.findIndex(t => t.id === park.id)
    state.parks.splice(index, 1, park)
    state.parks = [...state.parks]
  },
  setOnError (state) {
    state.onError = true
  },
  saveParkId (state, id) {
    state.selectedPark = id
  }
}

const actions = {
  async getAllParkAction ({ commit }) {
    try {
      const parks = await parkService.getParks()
      commit('initialiseParks', parks)
    } catch (error) {
      // Il n'est pas nécessaire de relancer l'exception. Ce qui importe c'est que le composant soit informé que l'état de postStore est en erreur.
      // console.log(error)
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

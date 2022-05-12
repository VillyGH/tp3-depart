import { parkService } from '@/services/parkService'

const state = {
  parks: [],
  selectedParkid: '',
  trailsofThePark: [],
  onError: false
}

const getters = {
  getParkById: state => id => {
    const park = state.parks.find(park => park.id === id)
    return park
  },
  getParks: state => {
    console.log(state.parks)
    return state.parks
  },
  getParkUsed () {
    return state.selectedParkid
  },
  getTrailsofTheParkSelected () {
    return state.trailsofThePark
  }
}

const mutations = {
  initialiseParks: (state, parks) => {
    state.parks = parks
    state.onError = false
  },
  initialiseParksApi: (state, parks) => {
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
  saveid (state, id) {
    state.selectedParkid = id
  },
  initialiseTrailsofThePark (state, trails) {
    console.log(trails)
    state.trailsofThePark = trails
    state.onError = false
  }
}

const actions = {
  async getAllParkAction ({ commit }) {
    try {
      const parks = await parkService.getParks()
      console.log(parks)
      commit('initialiseParks', parks)
    } catch (error) {
      // Il n'est pas nécessaire de relancer l'exception. Ce qui importe c'est que le composant soit informé que l'état de postStore est en erreur.
      // console.log(error)
      commit('setOnError')
    }
  },
  async getAllParkApiAction ({ commit }) {
    try {
      const parks = await parkService.getParksOnline()
      console.log(parks)
      commit('initialiseParksApi', parks)
    } catch (error) {
      // Il n'est pas nécessaire de relancer l'exception. Ce qui importe c'est que le composant soit informé que l'état de postStore est en erreur.
      // console.log(error)

      commit('setOnError')
    }
  },
  async getAllParkTrailsAction ({ commit }) {
    try {
      const trails = await parkService.getTrailsFromParkId(state.selectedParkid)
      console.log(trails)
      commit('initialiseTrailsofThePark', trails)
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

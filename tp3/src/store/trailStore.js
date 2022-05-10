import { trailService } from '@/services/trailService'

const state = {
  trails: [],
  onError: false
}

const getters = {
  getTrailById: state => id => {
    const trail = state.posts.find(post => post.id === id)
    return trail
  },
  getTrails: state => idOfPark => {
    const trailList = state.trails.filter(function (trail) {
      return trail.parkId === idOfPark
    })
    // console.log(trailList)
    return trailList // state.trails */
  }
}

const mutations = {
  initialiseTrails: (state, trails) => {
    console.log(trails)
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

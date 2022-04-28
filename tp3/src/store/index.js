import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'

// Code en commentaire ci-dessous: voir note de cours "Conserver les données dans le navigateur"
// Librairie vuex-persist afin de persister le store dans le navigateur
// import VuexPersistence from 'vuex-persist'

// Instanciation de de la persistence dans un session storage
// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage,
//   reducer: state => ({
//     authentication: {
//       token: state.authentication.token
//     }
//   })
// })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication
  }
  // plugins: [vuexLocal.plugin] // Utilisation du plugin de persistence.
})

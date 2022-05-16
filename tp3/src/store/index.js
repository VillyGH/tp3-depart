import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
<<<<<<< Updated upstream

=======
import VuexPersistence from 'vuex-persist'
import trails from '@/store/modules/trails.js'
import likes from '@/store/modules/likes.js'
import park from '@/store/modules/parkStore.js'
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    authentication
  }
  // plugins: [vuexLocal.plugin] // Utilisation du plugin de persistence.
=======
    authentication,
    trails,
    likes,
    park
  },
  plugins: [vuexLocal.plugin]
>>>>>>> Stashed changes
})

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import VuexPersistence from 'vuex-persist'
import trails from '@/store/trails.js'
import likes from '@/store/likes.js'
// Code en commentaire ci-dessous: voir note de cours "Conserver les données dans le navigateur"
// Librairie vuex-persist afin de persister le store dans le navigateur
// Instanciation de de la persistence dans un session storage
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    authentication: {
      token: state.authentication.token
    }
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    trails,
    likes
  },
  plugins: [vuexLocal.plugin]
})

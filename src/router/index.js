import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
  if (to.meta.requiresAuth && !store.getters['authentication/isLoggedIn']) {
    next({
      name: 'Login',
      query: { redirect: to.path }
    })
  } else if (to.meta.authPage && store.getters['authentication/isLoggedIn']) {
    next({
      name: 'WelcomePage'
    })
  } else {
    next()
  }
})

export default router

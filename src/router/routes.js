import WelcomePage from '@/views/WelcomePage.vue'
import Map from '@/views/Map.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import PageNotFound from '@/views/PageNotFound.vue'

export default [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authPage: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      authPage: true
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

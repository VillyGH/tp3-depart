import Home from '@/views/public/Home.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import PageNotFound from '@/views/PageNotFound.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
    // Code en commentaire ci-dessous: voir note de cours "Conserver les données dans le navigateur"
    // meta: {
    //   authPage: true
    // }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
    // Code en commentaire ci-dessous: voir note de cours "Conserver les données dans le navigateur"
    // meta: {
    //   authPage: true
    // }
  },
  /* {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }, */
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

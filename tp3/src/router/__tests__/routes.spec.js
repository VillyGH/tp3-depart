import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import PageNotFound from '@/views/PageNotFound'

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock('@/views/login/Login.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/register/Register.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/WelcomePage.vue', () => ({
  render: () => ''
}))

let wrapper
let router

beforeEach(() => {
  router = new VueRouter({ routes, mode: 'abstract' })

  // mount VS shallowMount
  wrapper = mount(App, {
    localVue,
    router
  })
})

describe('routes.js', () => {
  test('/ doit afficher la page d’accueil.', async () => {
    await router.push('/')

    expect(wrapper.findComponent(WelcomePage).exists()).toBe(true)
  })
  test('/login doit afficher la page de connection.', async () => {
    await router.push('/login')

    expect(wrapper.findComponent(Login).exists()).toBe(true)
  })
  test('/register doit afficher la page d’enregistrement.', async () => {
    await router.push('/register')

    expect(wrapper.findComponent(Register).exists()).toBe(true)
  })
  test("Doit informer l'utilisateur si la route n'existe pas.", async () => {
    await router.push('/cette-route-n-existe-pas')

    expect(wrapper.findComponent(PageNotFound).exists()).toBe(true)
  })
})

import axios from 'axios'
import { Login } from '@/views/login/Login'
import MockAdapter from 'axios-mock-adapter'
import AuthJsonFake from '@/views/__test__/data/authJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let auth

beforeEach(() => {
  auth = [...AuthJsonFake]

  mockAxios.reset()
})

describe('login.js', () => {
  test('Doit pouvoir envoyer les informations de l’authentification', async () => {
    const wrapper = await shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith(
      'authentication/login',
      auth.login
    )
  })

  test('Doit quitter la page, après une authentification avec succès.', async () => {
    // arrange
    const routerPush = jest.fn()

    document.getElementById('email').innerHTML = auth.login.email
    document.getElementById('password').innerHTML = auth.login.password

    const wrapper = await shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).toHaveBeenCalledWith({ name: 'WelcomePage' })
  })

  test('Après une mauvaise authentification doit afficher un message d’erreur', async () => {
    // arrange
    const routerPush = jest.fn()

    const wrapper = await shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).to({ name: 'WelcomePage' })
  })

  test('Après une authentification infructueuse, ne doit pas être redirigé vers une autre page', async () => {
    // arrange
    const routerPush = jest.fn()

    document.getElementById('email').innerHTML = auth.invalidLogin.email
    document.getElementById('password').innerHTML = auth.invalidLogin.password

    const wrapper = await shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).not.toHaveBeenCalledWith({ name: 'WelcomePage' })
  })
})

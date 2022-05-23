import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import { Login } from '@/views/login/Login'
import MockAdapter from 'axios-mock-adapter'
import { loginJsonFake } from '../../../tests/data/loginJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let logins
let firstLogin
let invalidLogin

beforeEach(() => {
  logins = [...loginJsonFake]
  firstLogin = logins[0]
  invalidLogin = logins[1]

  mockAxios.reset()
})

describe('Login.vue', () => {
  test('Doit pouvoir envoyer les informations de l’authentification', async () => {
    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      },
      data: {
        email: firstLogin.email,
        password: firstLogin.password
      }
    })
    await flushPromises()

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith(
      'authentication/login',
      firstLogin
    )
  })

  test('Doit quitter la page, après une authentification avec succès.', async () => {
    // arrange
    const routerPush = jest.fn()

    document.getElementById('email').innerHTML = firstLogin.email
    document.getElementById('password').innerHTML = firstLogin.password

    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      },
      data: {
        email: invalidLogin.email,
        password: invalidLogin.password
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

    document.getElementById('email').innerHTML = invalidLogin.email
    document.getElementById('password').innerHTML = invalidLogin.password

    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      },
      data: {
        email: invalidLogin.email,
        password: invalidLogin.password
      }
    })

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    const errorMessage = wrapper.find('error').text()
    expect(errorMessage).not.toBe('')
  })

  test('Après une authentification infructueuse, ne doit pas être redirigé vers une autre page', async () => {
    // arrange
    const routerPush = jest.fn()



    const wrapper = await shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      },
      data: {
        email: invalidLogin.email,
        password: invalidLogin.password
      }
    })

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).not.toHaveBeenCalledWith({ name: 'WelcomePage' })
  })
})

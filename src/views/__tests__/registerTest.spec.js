import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import { Login } from '@/views/login/Login'
import MockAdapter from 'axios-mock-adapter'
import { registerJsonFake } from '../../../tests/data/registerJsonFake'

var mockAxios = new MockAdapter(axios)

let registers
let firstRegister
let invalidRegister

beforeEach(() => {
  registers = [...registerJsonFake]
  firstRegister = registers[0]
  invalidRegister = registers[1]

  mockAxios.reset()
})

describe('Login.vue', () => {
  test('Doit pouvoir envoyer les informations de l’authentification', async () => {
    const wrapper = shallowMount(Login, {
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

    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    document.getElementById('email').innerHTML = firstRegister.email
    document.getElementById('password').innerHTML = firstRegister.password

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).toHaveBeenCalledWith({ name: 'WelcomePage' })
  })

  test('Après une mauvaise authentification doit afficher un message d’erreur', async () => {
    // arrange
    const routerPush = jest.fn()

    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    document.getElementById('email').innerHTML = invalidRegister.email
    document.getElementById('password').innerHTML = invalidRegister.password

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).to({ name: 'WelcomePage' })
  })

  test('Après un enregistrement sans succès, ne doit pas être redirigé vers une autre page', async () => {
    // arrange
    const routerPush = jest.fn()

    const wrapper = shallowMount(Login, {
      $router: {
        push: param => routerPush(param)
      }
    })

    document.getElementById('email').innerHTML = invalidRegister.email
    document.getElementById('password').innerHTML = invalidRegister.password

    await flushPromises()
    // act
    await wrapper.find('form').trigger('submit.prevent')
    // assert
    expect(routerPush).not.toHaveBeenCalledWith({ name: 'WelcomePage' })
  })
})

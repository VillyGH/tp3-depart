import axios from 'axios'
import { authService } from '@/services/authService'
import MockAdapter from 'axios-mock-adapter'
import AuthJsonFake from '@/views/__test__/data/authJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let auth

beforeEach(() => {
  auth = [...AuthJsonFake]

  mockAxios.reset() // Nécessaire pour avoir un historique vide pour chacun des tests.
})

describe('login.js', () => {
  test('Doit pouvoir envoyer les informations de l’authentification', async () => {
    const login = {

    }
    const wrapper = await postDetailShallowMount({
      $router: {
        push: () => {}
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith(
      'authentication/login',
      login
    )
  })

  test('register doit retourner un token valide', async () => {
    const token = "$2a$04$2663%634643"
    const profile = {
      "email": "Trystan.Murray@outlook.com",
      "password": "myPassword135326",
      "name": "Maxime Gagnon"
    }
    mockAxios.onGet(`${API}/api/register`).reply(201, token)

    const response = await authService.register(profile)

    expect(response).toStrictEqual(token)
  })
})

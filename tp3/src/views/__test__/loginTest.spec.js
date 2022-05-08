import axios from 'axios'
import { authService } from '@/services/authService'
import MockAdapter from 'axios-mock-adapter'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let users

beforeEach(() => {
  users = [...usersJsonFake]

  mockAxios.reset() // Nécessaire pour avoir un historique vide pour chacun des tests.
})

describe('login.js', () => {
  test('getToken doit retourner un token valide', async () => {
    const token = "$2a$04$oEnuRCQXlN1UyVfDJfh21eCfYmMRPj3k/iQmLus0eFuUk/h.OIazG"
    const credentials = {
      "email": "Branson35@hotmail.com",
      "password": "2632976cad"
    }
    mockAxios.onGet(`${API}/api/login`, credentials).reply(200, token)

    const response = await authService.getToken(credentials)

    expect(response).toStrictEqual(token)
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

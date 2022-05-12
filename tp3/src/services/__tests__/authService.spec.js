import axios from 'axios'
import { authService } from '@/services/authService'
import MockAdapter from 'axios-mock-adapter'
import { authJsonFake } from '../../../tests/data/loginJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let auth

beforeEach(() => {
  auth = [...authJsonFake]

  mockAxios.reset()
})

describe('authService.js', () => {
  test('getToken doit retourner un token valide', async () => {
    const token = "$2a$04$oEnuRCQXlN1UyVfDJfh21eCfYmMRPj3k/iQmLus0eFuUk/h.OIazG"
    const credentials = {

    }
    mockAxios.onGet(`${API}/api/login`, credentials).reply(200, token)

    const response = await authService.getToken(credentials)

    expect(response).toStrictEqual(token)
  })

  test('register doit retourner un token valide', async () => {
    const token = "$2a$04$2663%634643"
    mockAxios.onGet(`${API}/api/register`).reply(201, token)

    const response = await authService.register(auth.register)

    expect(response).toStrictEqual(token)
  })
})

import axios from 'axios'
import { authService } from '@/services/authService'
import MockAdapter from 'axios-mock-adapter'
import { loginJsonFake } from '../../../tests/data/loginJsonFake'
import { registerJsonFake } from '../../../tests/data/registerJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let logins
let firstlogin
let registers
let firstregister

beforeEach(() => {
  logins = [...loginJsonFake]
  firstlogin = logins[0]
  registers = [...registerJsonFake]
  firstregister = registers[0]

  mockAxios.reset()
})

describe('authService.js', () => {
  test('getToken doit retourner un token valide', async () => {
    const token = "$2a$04$oEnuRCQXlN1UyVfDJfh21eCfYmMRPj3k/iQmLus0eFuUk/h.OIazG"

    mockAxios.onGet(`${API}/api/login`, firstlogin).reply(200, token)

    const response = await authService.getToken(firstlogin)

    expect(response).toStrictEqual(token)
  })

  test('register doit retourner un token valide', async () => {
    const token = "$2a$04$2663%634643"
    mockAxios.onGet(`${API}/api/register`).reply(201, token)

    const response = await authService.register(firstregister)

    expect(response).toStrictEqual(token)
  })
})

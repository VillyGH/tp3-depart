import axios from 'axios'
import { parkService } from '@/services/parkService'
import MockAdapter from 'axios-mock-adapter'
import { parkJsonFake } from '../../../tests/data/parkJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let parks
let firstPark

beforeEach(() => {
  parks = [...parkJsonFake]
  firstPark = parks[0]

  mockAxios.reset()
})

describe('parkService.js', () => {
  test('getParks doit retourner l’ensemble des parcs', async () => {
    mockAxios.onGet(`${API}/api/parks`).reply(200, parks)

    const response = await parkService.getParks()

    expect(response).toStrictEqual(parks)
  })

  test('getParksById doit retourner le parc avec l’id correspondant', async () => {
    mockAxios.onGet(`${API}/api/park`, firstPark.id).reply(201, firstPark)

    const response = await parkService.getParkById(firstPark.id)

    expect(response).toStrictEqual(firstPark)
  })
})

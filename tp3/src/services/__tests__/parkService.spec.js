import axios from 'axios'
import { parkService } from '@/services/parkService'
import MockAdapter from 'axios-mock-adapter'
import { parksJsonFake } from '../../../tests/data/parksJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let parks
let firstPark

beforeEach(() => {
  parks = [...parksJsonFake]
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
    const id = 0
    mockAxios.onGet(`${API}/api/parks`, id).reply(201, firstPark)

    const response = await parkService.getParkById(id)

    expect(response).toStrictEqual(park)
  })
})

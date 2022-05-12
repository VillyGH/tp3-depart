import axios from 'axios'
import { trailService } from '@/services/trailService'
import MockAdapter from 'axios-mock-adapter'
import { trailsJsonFake } from '../../../tests/data/trailsJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let trails
let firstTrail

beforeEach(() => {
  trails = [...trailsJsonFake]
  firstTrail = trails[0]
  firstSegment = segments[0]

  mockAxios.reset()
})

describe('trailService.js', () => {
  test('getTrails doit retourner l’ensemble dess sentiers', async () => {
    mockAxios.onGet(`${API}/api/trails`).reply(200, trails)

    const response = await trailService.gettrails()

    expect(response).toStrictEqual(trails)
  })

  test('getTrailsById doit retourner les sentier avec l’id correspondant', async () => {
    const id = 0
    mockAxios.onGet(`${API}/api/trails`, id).reply(201, firstTrail)

    const response = await trailService.getParkById(id)

    expect(response).toStrictEqual(firstTrail)
  })

  test('getTrailsSegments doit retourner les segement du sentier avec l’id correspondant', async () => {
    const id = 0
    mockAxios.onGet(`${API}/api/segments`, id).reply(201, firstSegment)

    const response = await trailService.getTrailSegments(id)

    expect(response).toStrictEqual(firstSegment)
  })
})

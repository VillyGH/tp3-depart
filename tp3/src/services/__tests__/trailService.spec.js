import axios from 'axios'
import { trailService } from '@/services/trailService'
import MockAdapter from 'axios-mock-adapter'
import { trailJsonFake } from '../../../tests/data/trailJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let trails
let segments
let firstTrail


beforeEach(() => {
  trails = [...trailJsonFake]
  firstTrail = trails[0]
  segments = firstTrail.segments

  mockAxios.reset()
})

describe('trailService.js', () => {
  test('getTrails doit retourner l’ensemble des sentiers', async () => {
    mockAxios.onGet(`${API}/api/trails`).reply(200, trails)

    const response = await trailService.getParkTrails()

    expect(response).toStrictEqual(trails)
  })

  test('getTrailsById doit retourner les sentier avec l’id correspondant', async () => {
    mockAxios.onGet(`${API}/api/trail`, firstTrail.id).reply(200, firstTrail)

    const response = await trailService.getTrailById(firstTrail.id)

    expect(response).toStrictEqual(firstTrail)
  })

  test('getTrailsSegments doit retourner les segments du sentier avec l’id correspondant', async () => {
    mockAxios.onGet(`${API}/api/segments`, firstTrail.id).reply(200, segments)

    const response = await trailService.getTrailSegments(firstTrail.id)

    expect(response).toStrictEqual(segments)
  })
})

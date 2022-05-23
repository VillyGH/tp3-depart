import axios from 'axios'
import { trailService } from '@/services/trailService'
import trails from '../trails'
import MockAdapter from 'axios-mock-adapter'
import { trailJsonFake } from '../../../../tests/data/trailJsonFake'

var mockAxios = new MockAdapter(axios)
jest.mock('@/services/parkService')
const API = process.env.VUE_APP_API

let trailArray
let firstTrail

beforeEach(() => {
  trailArray = [...trailJsonFake]
  firstTrail = trailArray[0]

  mockAxios.reset()
})

describe('Authentification', () => {
  describe('getters', () => {
    test('getTrailById doit retourner le bon trail', async () => {
      const state = { trails: [...trailJsonFake] }
      const fistTrail = state.trails[0]

      const stateTrail = trails.getters.getTrailById(state)(firstTrail.id)

      expect(stateTrail).toStrictEqual(fistTrail)
    })
    test('getTrails doit retourner les trails', async () => {
      const state = { trails: [...trailJsonFake] }

      const stateTrail = trails.getters.getTrails(state)

      expect(stateTrail).toStrictEqual(trailArray)
    })
  })
})

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
let trailSegments

beforeEach(() => {
  trailArray = [...trailJsonFake]
  firstTrail = trailArray[0]
  trailSegments = trailArray[0].segments
  mockAxios.reset()
})

describe('Authentification', () => {
  describe('getters', () => {
    test('getSelectedTrail doit retourner le bon trail', async () => {
      const state = { trails: [...trailJsonFake], selectedTrail: trailArray[0] }

      const stateTrail = trails.getters.getSelectedTrail(state)

      expect(stateTrail).toStrictEqual(trailArray[0])
    })
    test('getTrails doit retourner les trails', async () => {
      const state = { trails: [...trailJsonFake] }

      const stateTrail = trails.getters.getTrails(state)

      expect(stateTrail).toStrictEqual(trailArray)
    })
    test('getTrailSegments doit retourner les segments', async () => {
      const state = { trails: [...trailJsonFake], trailSegments: trailSegments }

      const stateTrailSegment = trails.getters.getTrailSegments(state)

      expect(stateTrailSegment).toStrictEqual(trailSegments)
    })
    test('getErrorMessage doit retourner le bon message derreur', async () => {
      const state = {
        trails: [...trailJsonFake],
        trailSegments: trailSegments,
        errorMessage: 'error'
      }

      const stateTrailError = trails.getters.getErrorMessage(state)

      expect(stateTrailError).toStrictEqual('error')
    })
  })
  describe('mutations', () => {
    test('initialiseTrails doit initialiser les trails', async () => {
      const state = { trails: [] }

      trails.mutations.initialiseTrails(state, trailArray)

      expect(state.trails).toStrictEqual(trailArray)
    })
    test('saveTrail doit initialiser le trail sélectionné', async () => {
      const state = { trails: [...trailJsonFake] }

      trails.mutations.saveTrail(state, trailArray[0])

      expect(state.selectedTrail).toStrictEqual(trailArray[0])
    })
    test('initialiseSegments doit initialiser les segments sélectionné', async () => {
      const state = { trails: [...trailJsonFake] }

      trails.mutations.initialiseSegments(state, trailArray[0].segments)

      expect(state.trailSegments).toStrictEqual(trailArray[0].segments)
    })
  })
  describe('actions', () => {
    test("getAllParksAction doit appeler la mutation initialiseTrails avec les publication provenant de l'api", async () => {
      const commit = jest.fn()
      trailService.getParkTrails(15).mockResolvedValue(trailArray)

      await parks.actions.getAllParkTrailsAction({ commit }, 15)

      expect(commit).toHaveBeenCalledWith('initialiseTrails', trailArray)
    })
    test("getAllParksAction: si erreur avec l'api, onError doit être à vrai ", async () => {
      const commit = jest.fn()
      trailService.getTrails.mockRejectedValue(new Error())

      try {
        await parks.actions.getAllParkAction({ commit })
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError', new Error())
    })
  })
})

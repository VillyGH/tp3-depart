import axios from 'axios'
import { parkService } from '@/services/parkService'
import parks from '../parks'
import MockAdapter from 'axios-mock-adapter'
import { parkJsonFake } from '../../../../tests/data/parkJsonFake'

var mockAxios = new MockAdapter(axios)
jest.mock('@/services/parkService')
const API = process.env.VUE_APP_API

let parksArray
let firstPark

beforeEach(() => {
  parksArray = [...parkJsonFake]
  firstPark = parksArray[0]

  mockAxios.reset()
})

describe('Authentification', () => {
  describe('getters', () => {
    test('getParkById doit retourner le bon park', async () => {
      const state = { parks: [...parkJsonFake] }
      const fistPark = state.parks[0]

      const stateToken = parks.getters.getParkById(state)(fistPark.id)

      expect(stateToken).toStrictEqual(fistPark)
    })
    test('getPark doit retourner tout les park', async () => {
      const state = { parks: [...parkJsonFake] }
      const fistPark = state.parks[0]

      const park = parks.getters.getParks(state)

      expect(park).toStrictEqual(parksArray)
    })
    test('getSelectedPark doit retourner le bon park', async () => {
      const state = { parks: [...parkJsonFake], selectedPark: parksArray[0] }

      const park = parks.getters.getSelectedPark(state)

      expect(park).toStrictEqual(parksArray[0])
    })
    test('getErrorMessage doit retourner le bon message', async () => {
      const state = {
        parks: [...parkJsonFake],
        selectedPark: parksArray[0],
        errorMessage: 'error'
      }

      const error = parks.getters.getErrorMessage(state)

      expect(error).toStrictEqual('error')
    })
  })
  describe('mutations', () => {
    test('initialiseParks doit initialiser les parks', async () => {
      const state = { parks: [] }

      parks.mutations.initialiseParks(state, parksArray)

      expect(state.parks).toStrictEqual(parksArray)
    })
    test('savePark doit mettre à jour un park', async () => {
      const state = { parks: parksArray }

      parks.mutations.savePark(state, parksArray[0])

      expect(state.selectedPark).toStrictEqual(parksArray[0])
    })
    test("setOnError doit mettre l'état en erreur", async () => {
      const state = {
        errorMessage: ''
      }

      parks.mutations.setOnError(state, 'error')

      expect(state.errorMessage).toStrictEqual('error')
    })
  })
  describe('actions', () => {
    test("getAllParksAction doit appeler la mutation initializeParks avec les publication provenant de l'api", async () => {
      const commit = jest.fn()
      parkService.getParks.mockResolvedValue(parksArray)

      await parks.actions.getAllParkAction({ commit })

      expect(commit).toHaveBeenCalledWith('initialiseParks', parksArray)
    })
    test("getAllParksAction: si erreur avec l'api, onError doit être à vrai ", async () => {
      const commit = jest.fn()
      parkService.getParks.mockRejectedValue(new Error())

      try {
        await parks.actions.getAllParkAction({ commit })
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError', new Error())
    })
  })
})

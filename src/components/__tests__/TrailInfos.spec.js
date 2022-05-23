import { shallowMount } from '@vue/test-utils'
import { when, resetAllWhenMocks } from 'jest-when'
import TrailInfos from '@/components/TrailInfos.vue'
import { trailsJsonFake } from '../../../tests/data/trailJsonFakes'
import flushPromises from 'flush-promises'

let store
let trails
let firstTrail

beforeEach(() => {
  resetAllWhenMocks()
  trails = [...trailsJsonFake]
  firstTrail = { ...trails[0] }
  store = createMockStore()
})

describe('TrailInfos.vue', () => {
  test('À l’ouverture, doit contenir la liste de tous les sentiers disponibles.', async () => {
    const wrapper = shallowMount(TrailInfos)
    const optionsValue = wrapper
      .find('option')
      .wrappers.map(option => option.element.value)

    const trailNames = trails.map(trail => trail.name)
    expect(trailNames).toEqual(optionsValue)
  })
  test('À l’ouverture, le premier sentier devrait être celui selectionné', async () => {
    const wrapper = shallowMount(TrailInfos)
    const selectValue = wrapper.find('select')

    expect(firstTrail.name).toEqual(selectValue.element.value)
  })

  test('Lorsqu’un sentier est selectionné son identifiant est sauvegardé', async () => {
    const wrapper = shallowMount(TrailInfos)
    await wrapper.findAll('option')[0].trigger('change')

    expect(firstPark).toEqual(selectValue.element.value)
  })

  test('Si une erreur se produit lors de l’acquisition des données une erreur est affiché', async () => {
    const wrapper = shallowMount(TrailInfos)
    const optionsValue = wrapper
      .find('option')
      .wrappers.map(option => option.element.value)

    expect(trails).toEqual(optionsValue)
  })
})

function createMockStore () {
  const saveParkIdMock = jest.fn()
  when(saveParkIdMock)
    .calledWith(trails[0].id)
    .mockReturnValue({ ...trails[0] })

  const store = {
    state: {
      trails: {
        trails: [...trailsJsonFake],
        selectedTrail: trails[0],
        onError: false
      }
    },
    getters: {
      'trails/saveParkId': saveParkIdMock
    },
    dispatch: jest.fn()
  }
  return store
}

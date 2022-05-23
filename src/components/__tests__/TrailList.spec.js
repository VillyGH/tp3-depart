import { shallowMount } from '@vue/test-utils'
import { when, resetAllWhenMocks } from 'jest-when'
import TrailList from '@/components/TrailList.vue'
import { trailsJsonFake } from '@/../tests/data/parkJsonFake'
import uiTextPlugin from '../../externalization/uiTextPlugin'
import flushPromises from 'flush-promises'

let store
let trails
let firstTrail

beforeEach(() => {
  resetAllWhenMocks()
  trails = [...trailsJsonFake] // On utilise un copie, ainsi on s'assure que trails ne sera pas altéré entre les tests
  firstTrail = { ...trails[0] } // Même chose pour firstpost, on utilise un copie, pour s'assurer que firstpost ne soit pas altéré entre les tests.
  store = createMockStore()
})

describe('TrailList.vue', () => {
  test('À l’ouverture, doit contenir la liste de tous les parcs disponibles.', async () => {
    const wrapper = shallowMount(TrailList)
    const optionsValue = wrapper
      .find('option')
      .wrappers.map(option => option.element.value)

    const parkNames = trails.map(park => park.name)
    expect(parkNames).toEqual(optionsValue)
  })
  test('À l’ouverture, le premier parc devrait être celui selectionné', async () => {
    const wrapper = shallowMount(TrailList)
    const selectValue = wrapper.find('select')

    expect(firstTrail.name).toEqual(selectValue.element.value)
  })

  test('Lorsqu’un parc est selectionné celui-ci est sauvegardé', async () => {
    const wrapper = shallowMount(TrailList)
    await wrapper.findAll('option')[0].trigger('change')

    expect(firstTrail).toEqual(store.state.selectedPark)
  })

  test('Si une erreur se produit lors de l’acquisition des données une erreur est affiché', async () => {
    const wrapper = shallowMount(TrailList)
    store.state.onError = true
    const errorMessage = wrapper.find('.error').text()

    expect(errorMessage).toEqual(uiTextPlugin.trailsError)
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
        selectedPark: trails[0],
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

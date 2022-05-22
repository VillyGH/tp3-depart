import { shallowMount } from '@vue/test-utils'
import { when, resetAllWhenMocks } from 'jest-when'
import ParkList from '@/components/ParkList.vue'
import { parksJsonFake } from '@/../tests/data/parkJsonFake'
import uiTextPlugin from '../../externalization/uiTextPlugin'
import flushPromises from 'flush-promises'

let store
let parks
let firstPark

beforeEach(() => {
  resetAllWhenMocks()
  parks = [...parksJsonFake] // On utilise un copie, ainsi on s'assure que parks ne sera pas altéré entre les tests
  firstPark = { ...parks[0] } // Même chose pour firstpost, on utilise un copie, pour s'assurer que firstpost ne soit pas altéré entre les tests.
  store = createMockStore()
})

describe('ParkList.vue', () => {
  test('À l’ouverture, doit contenir la liste de tous les parcs disponibles.', async () => {
    const wrapper = shallowMount(ParkList)
    const optionsValue = wrapper
      .find('option')
      .wrappers.map(option => option.element.value)

    const parkNames = parks.map(park => park.name)
    expect(parkNames).toEqual(optionsValue)
  })
  test('À l’ouverture, le premier parc devrait être celui selectionné', async () => {
    const wrapper = shallowMount(ParkList)
    const selectValue = wrapper.find('select')

    expect(firstPark.name).toEqual(selectValue.element.value)
  })

  test('Lorsqu’un parc est selectionné celui-ci est sauvegardé', async () => {
    const wrapper = shallowMount(ParkList)
    await wrapper.findAll('option')[0].trigger('change')

    expect(firstPark).toEqual(store.state.selectedPark)
  })

  test('Si une erreur se produit lors de l’acquisition des données une erreur est affiché', async () => {
    const wrapper = shallowMount(ParkList)
    store.state.onError = true
    const errorMessage = wrapper.find('.error').text()

    expect(errorMessage).toEqual(uiTextPlugin.parksError)
  })
})

function createMockStore () {
  const saveParkIdMock = jest.fn()
  when(saveParkIdMock)
    .calledWith(parks[0].id)
    .mockReturnValue({ ...parks[0] })

  const store = {
    state: {
      parks: {
        parks: [...parksJsonFake],
        selectedPark: parks[0],
        onError: false
      }
    },
    getters: {
      'parks/saveParkId': saveParkIdMock
    },
    dispatch: jest.fn()
  }
  return store
}

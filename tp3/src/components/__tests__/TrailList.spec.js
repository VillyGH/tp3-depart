import { shallowMount } from '@vue/test-utils'
import { when, resetAllWhenMocks } from 'jest-when'
import TrailList from '@/components/ParkList.vue'
import { trailsJsonFake } from '@/../tests/data/trailsJsonFake.js'
import flushPromises from 'flush-promises'

let store
let parkId
let firstTrail
let trails

beforeEach(() => {
  resetAllWhenMocks()
  trails = [...trailsJsonFake] // On utilise un copie, ainsi on s'assure que parks ne sera pas altéré entre les tests
  firstTrail = { ...trails[0] } // Même chose pour firstpost, on utilise un copie, pour s'assurer que firstpost ne soit pas altéré entre les tests.
  store = createMockStore()
})

function createMockStore () {
  const saveTrailIdMock = jest.fn()
  when(saveTrailIdMock)
    .calledWith(trails[0].id) // permet d'être plus précis
    .mockReturnValue({ ...trails[0] }) // On veut une copie

  const store = {
    state: {
      trails: {
        // n'est pas solicité dans le composant PostDetail. Donc non nécessaire ici.
        trails: [...trailsJsonFake],
        selectedTrailId: trails[0].id,
        onError: false
      }
    },
    getters: {
      'trails/saveTrailId': saveTrailIdMock
    },
    dispatch: jest.fn()
  }
  return store
}

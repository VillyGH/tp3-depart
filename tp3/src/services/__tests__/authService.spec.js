import axios from 'axios'
import { postsJsonFake } from '@/../tests/data/postsJsonFake'
import { postsService } from '@/services/postsService'
import MockAdapter from 'axios-mock-adapter'

// jest.mock('axios')
var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API
let posts

beforeEach(() => {
  posts = [...postsJsonFake]

  mockAxios.reset() // Nécessaire pour avoir un historique vide pour chacun des tests.
})

describe('postsService.js', () => {
  test("getPosts doit retourner l'ensemble des publications", async () => {
    mockAxios.onGet(`${API}/posts`).reply(200, posts)

    const response = await postsService.getPosts()

    expect(response).toStrictEqual(posts)
  })

  test('getPost doit retourner la publication associée au id', async () => {
    const firstPost = posts[0]
    mockAxios.onGet(`${API}/posts/${firstPost.id}`).reply(200, firstPost)

    const response = await postsService.getPost(firstPost.id)

    expect(response).toStrictEqual(firstPost)
  })
  test("updatePost doit envoyer une requête put à l'api", async () => {
    const firstPost = posts[0]
    const expectedUrl = `${API}/posts/${firstPost.id}`
    mockAxios.onPut(expectedUrl, firstPost).reply(204)

    await postsService.updatePost(firstPost)

    expect(mockAxios.history.put[0].url).toBe(expectedUrl)
  })
  test("addPost doit envoyer une requête post à l'api", async () => {
    // TODO
  })
})

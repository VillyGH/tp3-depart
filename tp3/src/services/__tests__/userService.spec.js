import axios from 'axios'
import { userService } from '../userService'
import requestInterceptor from '@/shared/requestInterceptor'
import MockAdapter from 'axios-mock-adapter'
import { userJsonFake } from '../../../tests/data/userJsonFake'
import { likesJsonFake } from '../../../tests/data/likesJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let infos
let users
let likes
let firstUser
let firstUserLikes

beforeEach(() => {
  users = [...userJsonFake]
  likes = [...likesJsonFake]
  firstUser = users[0]
  firstUserLikes = likes[0]

  infos = {
    userId: firstUser.userId,
    trailId: firstUser.trailId
  }

  mockAxios.reset()
})

describe('userService.js', () => {
  test('getUserLikes doit retourner les likes de l’utilisateur', async () => {
    mockAxios.onGet(`${API}/api/users/${firstUser.id}/likes`).reply(200, firstUserLikes)

    const response = await userService.getUserLikes(firstUser.id)

    expect(response).toStrictEqual(firstUserLikes)
  })
  test('likeTrail doit ajouter un like sur le trail correspondant', async () => {
    mockAxios.onPost(`${API}/api/likes`).reply(200, like)

    const response = await userService.likeTrail(infos.userId, infos.trailId)

    expect(response).toStrictEqual(like)
  })

  test('removeLikeTrail doit enlever un like de l’utilisateur correspondant', async () => {
    const id = 2
    mockAxios.onRemove(`${API}/api/likes`, id).reply(201)

    const response = await userService.removeUserLike(id)

    expect(response).not.toContain(likes[2])
  })
})

import axios from 'axios'
import { userService } from '@/services/userService'
import MockAdapter from 'axios-mock-adapter'
import { userJsonFake } from '../../../tests/data/userJsonFake'

var mockAxios = new MockAdapter(axios)

const API = process.env.VUE_APP_API

let infos
let users
let firstUser

beforeEach(() => {
  users = [...userJsonFake]
  firstUser = users[0]

  infos = {
    userId: firstUser.userId,
    trailId: firstUser.trailId
  }

  mockAxios.reset()
})

describe('userService.js', () => {
  test('likeTrail doit ajouter un like sur le trail correspondant', async () => {
    mockAxios.onGet(`${API}/api/users`).reply(200, users)

    const response = await userService.likeTrail(infos)

    expect(response).toStrictEqual(users)
  })
  test('getUserLikes doit retourner le nombre de likes sur le trail correspondant', async () => {
    mockAxios.onGet(`${API}/api/users/likes`).reply(200, users)

    const response = await userService.likeTrail(infos)

    expect(response).toStrictEqual(users)
  })

  test('removeLikeTrail doit enlever un like sur le trail correspondant', async () => {
    const id = 0
    mockAxios.onGet(`${API}/api/user`, id).reply(201, firstUser)

    const response = await userService.removeLikeTrail(id)

    expect(response).toStrictEqual(park)
  })
})

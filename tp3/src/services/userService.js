import { API } from '@/shared/config'
import axios from 'axios'


async function getUserLikes (id) {
  const response = await axios.get(`${API}/api/users/${id}/likes/`)
  return response.data
}

async function likeTrail (userId, trailId) {
  const infos = {
    userId: userId,
    trailId: trailId
  }
  const response = await axios.post(`${API}/api/likes/`, infos)

  return response.data
}

async function removeLikeTrail (id) {
  const response = await axios.delete(`${API}/api/likes/${id}`)
  return response.data
}

export const userService = {
  getUserLikes,
  likeTrail,
  removeLikeTrail
}

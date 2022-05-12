import { API } from '@/shared/config'
import axios from 'axios'

async function likeTrail (userId, trailId) {
  const response = await axios.post(`${API}/api/likes/`, userId, trailId)
  return response.data
}

async function removeLikeTrail (id) {
    const response = await axios.delete(`${API}/api/likes/${id}`)
    return response.data
  }

export const authService = {
  likeTrail,
  removeLikeTrail
}

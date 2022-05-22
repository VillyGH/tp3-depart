import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getUserLikes (userId) {
  try {
    const response = await requestInterceptor.get(`${API}/api/users/${userId}/likes/`)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function likeTrail (userId, trailId) {
  const infos = {
    userId: userId,
    trailId: trailId
  }
  try {
    const response = await requestInterceptor.post(`${API}/api/likes/`, infos)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function removeUserLike (userId) {
  try {
    const response = await requestInterceptor.delete(`${API}/api/likes/${userId}`)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const userService = {
  getUserLikes,
  likeTrail,
  removeUserLike
}

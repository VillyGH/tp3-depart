import * as axios from 'axios'
import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

async function getParkTrails (parkId) {
  const response = await axios.get(`${API}/api/parks/${parkId}/trails`)

  return response.data
}

async function getTrail (id) {
  const response = await axios.get(`${API}/api/trails/${id}`)
  return response.data
}

async function getTrailSegments (id) {
  const response = await axios.get(`${API}/api/segments/${id}`)

  return response.data
}

export const trailService = {
  getParkTrails,
  getTrail,
  getTrailSegments
}

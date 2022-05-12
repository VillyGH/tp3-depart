import * as axios from 'axios'
import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

async function getParks () {
  const response = await axios.get(`${API}/parks`)
  return response.data
}

async function getParkById (id) {
  const response = await axios.get(`${API}/parks/${id}`)
  return response.data
}

async function getParksOnline () {
  const response = await axios.get(`${API}/api/parks`)
  return response.data
}

async function getTrailsFromParkId (id) {
  const response = await axios.get(`${API}/api/parks/${id}/trails`)
  return response.data
}

export const parkService = {
  getParks,
  getParkById,
  getParksOnline,
  getTrailsFromParkId
}

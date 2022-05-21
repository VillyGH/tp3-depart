import { loginJsonFake } from '@/tests/data/loginJsonFake'
import { authService } from '@/services/authService.js'
import authentification from '@/store/modules/authentification.js'

jest.mock('@/services/authService')

let auth
let firstPost

beforeEach(() => {
  auth = [...loginJsonFake] // On utilise un copie, ainsi on s'assure que auth ne sera pas altéré entre les tests
  firstUser = { ...auth[0] } // Même chose pour firstpost, on utilise un copie, pour s'assurer que firstpost ne soit pas altéré entre les tests.
})

describe('Authentification', () => {
  describe('getters', () => {
    test('isLoggedIn doit retourner le state du token', async () => {
      const state = { auth: [...loginJsonFake] }
      const firstPost = state.auth[0]

      const stateToken = authentification.getters.isLoggedIn(state)

      expect(stateToken).toStrictEqual(firstPost)
    })

    test('getTokenUserId doit retourner le id de l’utilisateur', async () => {
      const state = { auth: [] }

      authentification.mutations.getTokenUserId(state)

      expect(state.auth).toStrictEqual(auth)
    })
  })

  describe('mutations', () => {
    test('clearError doit enlever l’état d’erreur du service d’authentification', async () => {
      const state = {
        authServiceError: 'Erreur: Utilisateur introuvable'
      }

      authentification.mutations.clearError(state)

      expect(state.authServiceError).toStrictEqual('')
    })

    test('initializeAuthentication doit initialiser le token d’authentification puis enlever l’état d’erreur', async () => {
      const state = { auth: auth }
      token = '68943$$869$438$693$40783'

      authentification.mutations.initializeAuthentication(state, token)

      expect(state.token).toStrictEqual(token)
    })

    test('setAuthServiceError doit mettre l’état d’erreur du service d’authentification', async () => {
      const message = 'Erreur: Utilisateur introuvable'
      const state = {
        authServiceError: ''
      }
      authentification.mutations.setAuthServiceError(state, message)

      expect(state.authServiceError).toStrictEqual(message)
    })
  })

  describe('actions', () => {
    test("login doit appeler la mutation initializeAuthentication avec le token provenant de l'api", async () => {
      const commit = jest.fn()
      authService.getToken.mockResolvedValue(token)

      const credentials = {
        email: 'Branson35@hotmail.com',
        password: '2632976cad'
      }

      await authentification.actions.login({ commit }, credentials)

      expect(commit).toHaveBeenCalledWith('initializeAuthentication', token)
    })

    test("login: si erreur avec l'api, le message de l’état d’erreur du service d’authentification doit être affiché", async () => {
      const commit = jest.fn()
      authService.getauth.mockRejectedValue(new Error())

      const credentials = {
        email: 'Branson35@hotmail.com',
        password: '2632976cad'
      }

      try {
        await authentification.actions.login({ commit }, credentials)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setAuthServiceError')
    })

    test('register doit appeler la mutation initializeAuthentication avec le token provenant de l’api', async () => {
      const commit = jest.fn()
      authService.getToken.mockResolvedValue(token)

      const profile = {
        name: 'Brandom',
        email: 'Branson35@hotmail.com',
        password: '2632976cad'
      }

      await authentification.actions.register({ commit }, profile)

      expect(commit).toHaveBeenCalledWith('initializeAuthentication', token)
    })

    test("updatePostAction doit faire une demande de mise à jour à l'api rest", async () => {
      const commit = jest.fn()

      await authentification.actions.updatePostAction({ commit }, firstPost)

      expect(authService.updatePost).toHaveBeenCalledWith(firstPost)
    })

    test("register: si erreur avec l'api, le message de l’état d’erreur du service d’authentification doit être affiché", async () => {
      const commit = jest.fn()
      authService.getauth.mockRejectedValue(new Error())

      const credentials = {
        name: 'Brandom',
        email: 'Branson35@hotmail.com',
        password: '2632976cad'
      }

      try {
        await authentification.actions.register({ commit }, credentials)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setAuthServiceError')
    })
  })
})

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar.vue'

jest.mock('@/views/Posts.vue')

let isLoggedIn = false

beforeEach(() => {
  resetAllWhenMocks()
})

describe('NavigationBar.vue', () => {
  test('Doit contenir un lien sur la page d’acceuil.', async () => {
    const wrapper = shallowMount(NavigationBar, {
      // Stubs permet de modifier un comportement. Ici on remplace RouterLink par un RouterLinkStub.
      // Ainsi, avec RouterLinkStub on peut tester notre composant sans dépendre d'une instance du routeur.
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).toContainEqual({
      name: 'WelcomePage'
    })
  })
  test('Doit contenir un lien sur la page de connection.', async () => {
    const wrapper = shallowMount(NavigationBar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).toContainEqual({
      name: 'Login'
    })
  })

  test('Doit contenir un lien sur la page d’inscription.', async () => {
    const wrapper = shallowMount(NavigationBar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).toContainEqual({
      name: 'Register'
    })
  })

  test('Doit contenir un lien sur la page de la carte lorsque connecté.', async () => {
    isLoggedIn = true
    store = createMockStore()
    const wrapper = shallowMount(NavigationBar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).toContainEqual({
      name: 'Map'
    })
  })

  test('Doit contenir un bouton se déconnecter lorsque connecté.', async () => {
    isLoggedIn = true
    const wrapper = shallowMount(NavigationBar)
    const logOutButton = wrapper
      .find('b-link.logout')

    expect(logOutButton).not.toBeUndefined()
  })

  test('Ne doit pas contenir un lien de connection lorsque connecté.', async () => {
    isLoggedIn = true
    store = createMockStore()
    const wrapper = shallowMount(NavigationBar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).not.toContainEqual({
      name: 'Login'
    })
  })

  test('Ne doit pas contenir un lien d’inscription lorsque connecté.', async () => {
    isLoggedIn = true
    store = createMockStore()
    const wrapper = shallowMount(NavigationBar, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).not.toContainEqual({
      name: 'Register'
    })
  })
})
function createMockStore () {
  const store = {
    getters: {
      //  ___ module "posts" dans le store.
      // |       ___ getter "getPostById" du module "posts"
      // V      V
      'authentication/isLoggedIn': isLoggedIn
      // Pourrait fonctionner, mais manque de précision. C'est pourquoi on utilise le when ci-dessus.
      // getPostById: () => {
      //   return { ...posts[0] }
      // }
    },
    dispatch: jest.fn()
  }
  return store
}

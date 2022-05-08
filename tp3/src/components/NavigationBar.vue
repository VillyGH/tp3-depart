<template>
  <!-- v-bind:class="nav-link {active:$route.name == 'Home'} -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-nav mr-auto">
      <router-link
        class="nav-link"
        v-bind:class="{ active: $route.name == 'WelcomePage' }"
        v-bind:to="{ name: 'WelcomePage' }"
        >Accueil</router-link
      >
    </div>
    <div class="navbar-nav ml-auto">
      <b-link @click="logout" v-if="isLoggedIn" class="nav-link">
        Se déconnecter
      </b-link>

      <router-link
        class="nav-link"
        v-bind:class="{ active: $route.name == 'Login' }"
        v-else
        v-bind:to="{ name: 'Login' }"
      >
        Connexion
      </router-link>
      <router-link
        class="nav-link"
        v-bind:class="{ active: $route.name == 'Register' }"
        v-if="!isLoggedIn"
        v-bind:to="{ name: 'Register' }"
      >
        Inscription
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters['authentication/isLoggedIn']
    }
  },
  methods: {
    // https://stackoverflow.com/questions/52229947/activate-method-on-router-link-click-in-vue
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

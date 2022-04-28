<template>
  <div>
    <b-container>
      <b-form @submit.prevent="login">
        <h1>Connexion</h1>
        <label>Courriel</label>
        <b-form-input required v-model="email" type="text" />
        <label>Mot de passe</label>
        <b-form-input required v-model="password" type="password" />
        <b-button variant="primary" type="submit" class="mt-4"
          >Se connecter</b-button
        >
      </b-form>

      <div v-if="authServiceError">{{ authServiceError }}</div>
    </b-container>
  </div>
</template>
<script>

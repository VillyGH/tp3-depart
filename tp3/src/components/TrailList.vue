<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="shipNames"
      id="shipNames"
      v-model="trail"
    >
      <option
        class="form-option-lg"
        v-for="trail in trails"
        v-bind:key="trail.id"
      >
        {{ trail.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TrailList',

  data () {
    return {
      trails: [],
      trail: {}
    }
  },
  async created () {
    await this.$store.dispatch('trails/getAllTrailAction')
    this.trails = this.$store.getters['trails/getTrails']('15') // changer le 15 pour l'id du park
  },
  methods: {}
}
</script>

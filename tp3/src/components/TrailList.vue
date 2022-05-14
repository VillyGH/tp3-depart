<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="trailNames"
      id="trailNames"
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
      trail: {},
      trails: [],
      parkId: 0
    }
  },
  async created () {
    await this.$store.dispatch('trails/getAllParkTrailsAction')
    this.trails = this.$store.getters['trails/getTrails']
  },
  methods: {}
}
</script>

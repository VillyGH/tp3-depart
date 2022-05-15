<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="trailNames"
      id="trailNames"
      v-model="firstTrail"
      v-on:change="saveId($event)"
    >
      <option class="form-option-lg" v-for="trail in trails" v-bind:key="trail.id">
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
      selectedIndex: 0,
      firstTrail: {},
      trail: {},
      trails: []
    }
  },
  async created () {
    await this.$store.dispatch('trails/getAllParkTrailsAction')
    this.trails = this.$store.getters['trails/getTrails']
    this.firstTrail = this.trails[0].name
    this.$store.commit('trails/saveTrailId', this.selectedIndex)
  },
  methods: {
    saveId (event) {
      this.selectedIndex = event.target.options.selectedIndex
      this.$store.commit('trails/saveTrailId', this.selectedIndex)
    }
  },
  computed: {
    onError () {
      return this.$store.state.trails.onError
    }
  }
}
</script>

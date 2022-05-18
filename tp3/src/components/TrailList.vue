<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="trailNames"
      id="trailNames"
      v-model="firstTrail.name"
      v-on:change="saveId($event)"
    >
      <option class="form-option-lg" v-for="trail in trails" v-bind:key="trail.id">
        {{ trail.name }}
      </option>
    </select>
    <div v-if="onError">{{ trailServiceError }}</div>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailList',
  data () {
    return {
      trail: {},
      firstTrail: {},
      trails: [],
      trailServiceError: uiTextPlugin.parksError
    }
  },
  async created () {
    this.initiateTrails()
  },
  methods: {
    async initiateTrails () {
      await this.$store.dispatch('parks/getAllParkAction')
      await this.$store.dispatch('trails/getAllParkTrailsAction')
        .then(() => {
          this.trails = this.$store.getters['trails/getTrails']
          console.log('Step 6')
          this.firstTrail = this.trails[0]
          this.$store.commit('trails/saveTrail', this.firstTrail)
        })
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedPark = this.parks[selectedIndex]
      this.$store.commit('trails/saveTrail', this.selectedPark)
    }
  },
  computed: {
    selectedPark: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      }
    },
    onError () {
      return this.$store.state.trails.onError
    }
  }
}
</script>

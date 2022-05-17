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
  },
  methods: {
    async initiateTrails () {
      await this.$store.dispatch('trails/getAllParkTrailsAction')
      this.trails = this.$store.getters['trails/getTrails']
      this.firstTrail = this.trails[0]
      this.$store.commit('trails/saveTrailId', this.firstTrail.id)
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedId = this.parks[selectedIndex].id
      this.$store.commit('trails/saveTrailId', this.selectedId)
    }
  },
  computed: {
    selectedId: {
      get () {
        return this.$store.getters['trails/getSelectedTrailId']
      }
    },
    onError () {
      return this.$store.state.trails.onError
    }
  }
}
</script>

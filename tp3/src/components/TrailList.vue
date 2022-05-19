<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="trailNames"
      id="trailNames"
      v-model="firstTrailName"
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
      firstTrailName: {},
      trails: [],
      trailServiceError: uiTextPlugin.parksError
    }
  },
  async mounted () {
    // this.initiateTrails()
  },
  methods: {
    async initiateTrails () {
      await this.$store.dispatch('trails/getAllParkTrailsAction', this.selectedPark.id)
      this.trails = this.$store.getters['trails/getTrails']
      this.firstTrailName = this.trails[0].name
      this.selectedTrail = this.trails[0]
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedTrail = this.trails[selectedIndex]
      this.$store.commit('trails/saveTrail', this.selectedTrail)
    }
  },
  computed: {
    selectedTrail: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      },
      set (newTrail) {
        this.$store.commit('trails/saveTrail', newTrail)
      }
    },
    selectedPark: {
      get () {
        return this.$store.getters['trails/getSelectedPark']
      },
      set (newPark) {
        this.$store.commit('trails/savePark', newPark)
      }
    },
    onError () {
      return this.$store.state.trails.onError
    }
  },
  watch: {
    selectedPark: {
      deep: true,
      handler: function (newVal, oldVa) {
        this.initiateTrails()
      }
    }
  }
}
</script>

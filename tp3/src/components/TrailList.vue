<template>
  <div class="ml-5">
    <label for="trailNames" class="ml-2">{{ trailLabel }} </label>
    <select
      class="mt-2 ml-3 form-select form-select-lg"
      name="trailNames"
      id="trailNames"
      v-model="firstTrailName"
      v-on:change="saveId($event)">
      <option class="form-option-lg" v-for="trail in trails" v-bind:key="trail.id">
        {{ trail.name }}
      </option>
    </select>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailList',
  data () {
    return {
      trailLabel: uiTextPlugin.trailLabel,
      trails: [],
      firstTrailName: {},
      trailServiceError: uiTextPlugin.parksError
    }
  },
  methods: {
    async initiateTrails () {
      await this.$store.dispatch('trails/getAllParkTrailsAction', this.selectedPark.id)
      if (this.errorMessage === '') {
        this.trails = this.$store.getters['trails/getTrails']
        this.firstTrailName = this.trails[0].name
        this.selectedTrail = this.trails[0]
      }
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedTrail = this.trails[selectedIndex]
    }
  },
  computed: {
    selectedPark: {
      get () {
        return this.$store.getters['parks/getSelectedPark']
      }
    },
    selectedTrail: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      },
      set (newTrail) {
        this.$store.commit('trails/saveTrail', newTrail)
      }
    },
    errorMessage: {
      get () {
        return this.$store.getters['trails/getErrorMessage']
      }
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

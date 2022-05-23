<template>
  <div class="ml-5">
    <label for="parkNames" class="ml-2">{{ parksLabel }} </label>
    <select
      class="mt-2 ml-3 form-select form-select-lg"
      name="parkNames"
      id="parkNames"
      v-model="firstParkName"
      v-on:change="saveId($event)"
    >
      <option class="form-option-lg" v-for="park in parks" v-bind:key="park.id">
        {{ park.name }}
      </option>
    </select>
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'ParkList',
  data () {
    return {
      parksLabel: uiTextPlugin.parksLabel,
      park: {},
      firstParkName: '',
      parks: [],
      parkServiceError: uiTextPlugin.parksError
    }
  },
  async created () {
    this.initializeParks()
  },
  methods: {
    async initializeParks () {
      await this.$store.dispatch('parks/getAllParkAction')
        .then(() => {
          this.parks = this.$store.getters['parks/getParks']
          this.selectedPark = this.parks[0]
          this.firstParkName = this.selectedPark.name
        })
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedPark = this.parks[selectedIndex]
    }
  },
  computed: {
    selectedPark: {
      get () {
        return this.$store.getters['parks/getSelectedPark']
      },
      set (newPark) {
        this.$store.commit('parks/savePark', newPark)
      }
    },
    errorMessage: {
      get () {
        return this.$store.getters['parks/getErrorMessage']
      }
    }
  }
}
</script>

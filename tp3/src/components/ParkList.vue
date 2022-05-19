<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="parkNames"
      id="parkNames"
      v-model="firstParkName"
      v-on:change="saveId($event)"
    >
      <option class="form-option-lg" v-for="park in parks" v-bind:key="park.id">
        {{ park.name }}
      </option>
    </select>
    <div v-if="onError" class="error">{{ parkServiceError }}</div>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'ParkList',
  data () {
    return {
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
          this.firstParkName = this.parks[0].name
          this.$store.commit('parks/savePark', this.parks[0])
          this.$store.commit('trails/savePark', this.parks[0])
        })
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedId = this.parks[selectedIndex].id
      this.$store.commit('parks/savePark', this.parks[this.selectedId])
      this.$store.commit('trails/savePark', this.parks[this.selectedId])
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
    onError () {
      return this.$store.state.parks.onError
    }
  }
}
</script>

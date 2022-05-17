<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="parkNames"
      id="parkNames"
      v-model="firstPark.name"
      v-on:change="saveId($event)"
    >
      <option class="form-option-lg" v-for="park in parks" v-bind:key="park.id">
        {{ park.name }}
      </option>
    </select>
    <div v-if="onError">{{ parkServiceError }}</div>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'ParkList',
  data () {
    return {
      park: {},
      firstPark: {},
      parks: [],
      parkServiceError: uiTextPlugin.parksError
    }
  },
  async created () {
    await this.$store.dispatch('parks/getAllParkAction')
    this.parks = this.$store.getters['parks/getParks']
    this.firstPark = this.parks[0]
    this.$store.commit('parks/saveParkId', this.parks[0].id)
  },
  methods: {
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedId = this.parks[selectedIndex].id
      console.log(this.selectedId)
      this.$store.commit('parks/saveParkId', this.selectedId)
    }
  },
  computed: {
    selectedId: {
      get () {
        return this.$store.getters['parks/getSelectedParkId']
      }
    },
    onError () {
      return this.$store.state.parks.onError
    }
  }
}
</script>

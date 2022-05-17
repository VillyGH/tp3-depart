<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="parkNames"
      id="parkNames"
      v-model="firstPark"
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
      selectedIndex: 0,
      firstPark: {},
      park: {},
      parkServiceError: uiTextPlugin.parksError
    }
  },
  async created () {
    await this.$store.dispatch('parks/getAllParkAction')
    this.parks = this.$store.getters['parks/getParks']
    this.firstPark = this.parks[0].name
    this.$store.commit('parks/saveParkId', this.selectedIndex)
  },
  methods: {
    saveId (event) {
      this.selectedIndex = event.target.options.selectedIndex
      this.$store.commit('parks/saveParkId', this.selectedIndex)
    }
  },
  computed: {
    parks: {
      get () {
        return this.$store.getters['parks/getParks']
      },
      set (newParks) {
        this.parks = newParks
      }
    },
    onError () {
      return this.$store.state.parks.onError
    }
  }
}
</script>

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
  </div>
</template>

<script>
export default {
  name: 'ParkList',
  data () {
    return {
      selectedIndex: 0,
      firstPark: {},
      park: {}
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
    parks () {
      return this.$store.state.parks.parks
    },
    onError () {
      return this.$store.state.parks.onError
    }
  }
}
</script>

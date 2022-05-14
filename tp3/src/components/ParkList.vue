<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="parkNames"
      id="parkNames"
      v-model="park"
      v-on:change="saveId()"
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
      parks: [],
      park: {}
    }
  },
  async created () {
    await this.$store.dispatch('parks/getAllParkAction')
    this.parks = this.$store.getters['parks/getParks']
  },
  methods: {
    saveId () {
      console.log(this.park.id) // undefined
      this.$store.mutations['parks/saveParkId'](this.park.id)
    }
  }
}
</script>

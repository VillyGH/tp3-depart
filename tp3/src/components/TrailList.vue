<template>
  <div>
    <select
      class="mt-2 form-select form-select-lg"
      name="shipNames"
      id="shipNames"
    >
      <option class="form-option-lg">
        park
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TrailList',
  data () {
    return {
      theParkSelectedName: []
    }
  },
  async created () {
    this.theParkSelectedName = this.$store.getters['trails/getAllTrailAction']()
    await this.$store.dispatch('trails/getAllTrailAction')
  },
  methods: {}
}
</script>

<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
  </l-map>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailMap',
  data () {
    return {
      polylineColor: uiTextPlugin.polylineColor,
      selectedLatlngs: []
    }
  },
  async created () {
    await this.$store.dispatch('trails/getTrailSegments')
    this.selectedLatlngs = this.$store.getters['trails/getCurrentTrailSegments']
  }
}
</script>

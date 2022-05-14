<template>
  <l-map style="height: 350px; width:350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  name: 'TrailMap',
  data () {
    return {
      selectedLatlngs: [],
      url: uiTextPlugin.mapUrl,
      attribution: uiTextPlugin.attribution,
      zoom: uiTextPlugin.zoomValue,
      center: [],
      polyline: {
        latlngs: [],
        color: uiTextPlugin.polylineDefaultColor
      }
    }
  },
  async created () {
    await this.$store.dispatch('trails/getTrailSegmentsAction')
    this.selectedLatlngs = this.$store.getters['trails/getTrailSegments']
    this.center = this.selectedLatlngs[0]
    this.polyline.latlngs = this.selectedLatlngs
  }
}
</script>

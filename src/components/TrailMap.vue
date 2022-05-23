<template>
  <div class="ml-5">
    <l-map style="height: 610px; width:610px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
    </l-map>
  </div>
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
      url: uiTextPlugin.mapUrl,
      attribution: uiTextPlugin.attribution,
      zoom: uiTextPlugin.zoomValue,
      center: [47.313220, -1.319482],
      polyline: {
        latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color: uiTextPlugin.polylineDefaultColor
      }
    }
  },
  methods: {
    async initiateSegments () {
      await this.$store.dispatch('trails/getTrailSegmentsAction', this.selectedTrail.id)
      const coordinates = this.$store.getters['trails/getTrailSegments'].coordinates
      this.polyline.latlngs = coordinates
      this.center = this.polyline.latlngs[0]
    },
    saveId (event) {
      const selectedIndex = event.target.options.selectedIndex
      this.selectedTrail = this.trails[selectedIndex]
    }
  },
  computed: {
    selectedTrail: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      }
    }
  },
  watch: {
    selectedTrail: {
      deep: true,
      handler: function (newVal, oldVa) {
        this.initiateSegments()
      }
    }
  }
}
</script>

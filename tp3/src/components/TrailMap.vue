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
  methods: {
    async initiateSegments () {
      await this.$store.dispatch('trails/getTrailSegmentsAction', this.selectedTrail.id)
      const coordinates = this.$store.getters['trails/getTrailSegments'].coordinates
      const arrayOfcoordinates = []
      arrayOfcoordinates.push(coordinates)
      this.polyline.latlngs = arrayOfcoordinates
      console.log(this.polyline.latlngs)
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

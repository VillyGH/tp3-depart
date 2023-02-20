<template>
  <div>
    <div class="row">
      <div class="col">
        <ParkList />
        <TrailList />
        <TrailMap />
      </div>
      <div class="col">
        <TrailInfos  />
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import ParkList from '@/components/ParkList'
import TrailList from '@/components/TrailList'
import TrailMap from '@/components/TrailMap'
import TrailInfos from '@/components/TrailInfos.vue'

export default {
  components: {
    ParkList,
    TrailList,
    TrailInfos,
    TrailMap
  }
}
</script>

<template>
  <div>
    <ParkList />
    <TrailList />
    <TrailInfos  />
    <TrailMap />
    <router-view />
  </div>
</template>

<script>
import ParkList from '@/components/ParkList'
import TrailList from '@/components/TrailList'
import TrailMap from '@/components/TrailMap'
import TrailInfos from '../components/TrailInfos.vue'

export default {
  components: {
    ParkList,
    TrailList,
    TrailMap,
    TrailInfos
  }
}
</script>

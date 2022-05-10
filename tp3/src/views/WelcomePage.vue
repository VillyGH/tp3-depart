<template>
  <div>
    <ParkList />
    <TrailList />
    <TrailMap />
    <router-view />
  </div>
</template>

<script>
import ParkList from '@/components/ParkList'
import TrailList from '@/components/TrailList'
import TrailMap from '@/components/TrailMap'

export default {
  components: {
    ParkList,
    TrailList,
    TrailMap
  }
}
</script>

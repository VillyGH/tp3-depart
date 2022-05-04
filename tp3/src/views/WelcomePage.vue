<template>
  <div>
    <TrailList />
    <TrailMap />
    <router-view />
  </div>
</template>

<script>
import TrailList from '@/components/TrailList'
import TrailMap from '@/components/TrailMap'

export default {
  components: {
    TrailList,
    TrailMap
  }
}
</script>

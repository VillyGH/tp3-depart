<template>
  <div>
    <NavigationBarVue />
    <TrailList />
    <TrailMap />
    <router-view />
  </div>
</template>

<script>
import NavigationBarVue from '../components/NavigationBar'
import TrailList from '@/components/TrailList'
import TrailMap from '@/components/TrailMap'

export default {
  components: {
      NavigationBarVue,
      TrailList,
      TrailMap,
  }
}
</script>

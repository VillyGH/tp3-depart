<template>
  <div>
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar
  }
}
</script>

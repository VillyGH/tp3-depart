<template>
  <div class="">
    <img v-bind:src="imageLikeUrl" style="width:100px;height:100px" alt="Like the trail image" onclick="likeTrail">
    <p>{{ nbLikes }}</p>
    <p>{{ selectedTrail }}</p>
    <p>{{ selectedPark }}</p>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailMap',

  data () {
    return {
      imageLikeUrl: uiTextPlugin.imageLikeUrl,
      nbLikes: 0,
      selectedPark: '',
      selectedTrail: ''
    }
  },
  async created () {
    this.selectedPark = ''
  },
  methods: {
    likeTrails () {
      await this.$store.dispatch('posts/incrementLikeCountAction')
    }
  }
}
</script>

<template>
  <div class="">
    <img
      v-bind:src="imageLikeUrl"
      style="width:100px;height:100px"
      alt="Like the trail image"
      v-on:click="onLikeClick"
    />
    <p>{{ nbLikes }}</p>
    <p>{{ selectedTrail }}</p>
    <p>{{ selectedPark }}</p>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailInfos',
  data () {
    return {
      imageLikeUrl: uiTextPlugin.imageLikeEmptyUrl,
      nbLikes: 0,
      selectedPark: '',
      selectedTrail: '',
      isLiked: false
    }
  },
  async created () {
    this.selectedParkName = this.$store.getters['trails/getSelectedParkId']
    this.isLiked = this.$store.getters['trails/isTrailLiked']
  },
  methods: {
    async onLikeClick () {
      if (this.isLiked) {
        await this.$store.dispatch('posts/likeTrailAction')
        this.imageLikeUrl = uiTextPlugin.imageLikeFilledUrl
      } else {
        await this.$store.dispatch('posts/removeLikeTrailAction')
        this.imageLikeUrl = uiTextPlugin.imageLikeEmptyUrl
      }
      this.isLiked = !this.isLiked
    }
  }
}
</script>

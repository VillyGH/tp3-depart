<template>
  <div class="">
    <img
      v-bind:src="imageLikeUrl"
      style="width:100px;height:100px"
      alt="Like the trail image"
      v-on:click="onLikeClick"
    />
    <p>{{ nbLikes }}</p>
    <p>{{ selectedTrail.name }}</p>
    <p>{{ selectedPark.name }}</p>
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
      isLiked: false
    }
  },
  async created () {
    this.initializeTrailInfos()
  },
  methods: {
    async initializeTrailInfos () {
      const userId = this.$store.getters['authentification/getTokenUserId']
      console.log(userId)
      await this.$store.dispatch('likes/getUserLikesAction', userId)
      this.nbLikes = this.$store.getters['likes/getUserLikes']
      this.isLiked = this.$store.getters['likes/isTrailLiked']
    },
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
  },
  computed: {
    selectedTrail: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      },
      set (newTrail) {
        this.$store.commit('trails/saveTrail', newTrail)
      }
    },
    selectedPark: {
      get () {
        return this.$store.getters['parks/getSelectedPark']
      }
    },
    onError () {
      return this.$store.state.trails.onError
    }
  }
}
</script>

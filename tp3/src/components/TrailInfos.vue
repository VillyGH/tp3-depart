<template>
  <div class="">
    <img
      v-bind:src="imageLikeUrl"
      style="width:100px;height:100px"
      alt="Like the trail image"
      v-on:click="onLikeClick"
    />
    <p>{{ nbTrailLikes }}</p>
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
      nbLikes: 0
    }
  },
  methods: {
    async initializeTrailInfos () {
      await this.$store.dispatch('likes/getTrailLikesAction', this.selectedTrail.id)
    },
    async onLikeClick () {
      if (!this.isTrailLiked) {
        await this.$store.dispatch('likes/likeTrailAction')
        this.imageLikeUrl = uiTextPlugin.imageLikeFilledUrl
      } else {
        await this.$store.dispatch('likes/removeUserLikeAction')
        this.imageLikeUrl = uiTextPlugin.imageLikeEmptyUrl
      }
      this.isTrailLiked = !this.isTrailLiked
    }
  },
  computed: {
    selectedTrail: {
      get () {
        return this.$store.getters['trails/getSelectedTrail']
      }
    },
    selectedPark: {
      get () {
        return this.$store.getters['parks/getSelectedPark']
      }
    },
    nbTrailLikes: {
      get () {
        return this.$store.getters['likes/getNbTrailLikes']
      },
      set (newValue) {
        this.$store.commit('likes/initiateTrailLikes')
      }
    },
    isTrailLiked: {
      get () {
        return this.$store.getters['likes/isTrailLiked']
      },
      set (newValue) {

      }
    },
    onError () {
      return this.$store.state.trails.onError
    }
  },
  watch: {
    selectedTrail: {
      deep: true,
      handler: function (newVal, oldVa) {
        this.initializeTrailInfos()
      }
    }
  }
}
</script>

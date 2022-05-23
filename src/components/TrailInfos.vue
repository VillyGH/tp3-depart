<template>
  <div class="ml-5">
    <p class="mt-2">{{ selectedTrail.name }}</p>
    <p>{{ parkText }} {{ selectedPark.name }}</p>
    <img
      v-bind:src="imageLikeUrl"
      style="width:100px;height:100px"
      alt="Like the trail image"
      v-on:click="onLikeClick"
    />
    <p class="ml-4">{{ nbTrailLiked }} {{ likesText }}</p>
    <p>{{ confirmationMessage }}</p>
  </div>
</template>

<script>
import uiTextPlugin from '../externalization/uiTextPlugin'
export default {
  name: 'TrailInfos',
  data () {
    return {
      parkText: uiTextPlugin.parcText,
      likesText: uiTextPlugin.likesText
    }
  },
  methods: {
    async initializeTrailInfos () {
      await this.$store.dispatch('likes/getTrailLikesAction', this.selectedTrail.id)
    },
    async onLikeClick () {
      if (!this.isTrailLiked) {
        await this.$store.dispatch('likes/likeTrailAction')
      } else {
        await this.$store.dispatch('likes/removeUserLikeAction')
      }
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
    nbTrailLiked: {
      get () {
        return this.$store.getters['likes/getNbTrailLiked']
      }
    },
    isTrailLiked: {
      get () {
        return this.$store.getters['likes/isTrailLiked']
      }
    },
    imageLikeUrl: {
      get () {
        return this.$store.getters['likes/getImgLikeUrl']
      }
    },
    confirmationMessage: {
      get () {
        return this.$store.getters['likes/getConfirmationMessage']
      }
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

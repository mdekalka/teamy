<template>
  <content-layout class="profile-view-page" :load-screen="isLoading">
    <profile-view :profile="profile" />
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'
import profileView from '@/components/profile/profile-view/profile-view'

import { getProfileById } from '@/components/profile/profile-api'
import profileModel from '@/components/profile/profile-model'

export default {
  name: 'profile-view-page',

  components: { contentLayout, profileView },

  data () {
    return {
      profile: profileModel,
      isLoading: false
    }
  },

  created () {
    this.loadProfile()
  },

  watch: {
    '$route': 'loadProfile'
  },

  methods: {
    loadProfile () {
      this.isLoading = true

      getProfileById(this.$route.params.id).then(profile => {
        this.errorMessage = ''
        this.profile = profile || profileModel
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  }
}
</script>


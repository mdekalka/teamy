<template>
  <content-layout class="profile-view-page" :load-screen="isLoading">
    <profile-view v-if="!isProfileFailed" :profile="profile" :delete-state="isDeleted" @on-remove="removeProfile" />
    <message-panel :show="isProfileFailed" :message="errorLoadMessage" :type="'danger'" />
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'
import profileView from '@/components/profile/profile-view/profile-view'
import messagePanel from '@/components/common/message-panel'

import { getProfileById, removeProfileById } from '@/components/profile/profile-api'
import profileModel from '@/components/profile/profile-model'
import { profile } from '@/config/messages'

export default {
  name: 'profile-view-page',

  components: { contentLayout, profileView, messagePanel },

  data () {
    return {
      profile: profileModel,
      isLoading: false,
      isDeleted: false,
      errorMessage: ''
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
        this.profile = profile
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    },

    removeProfile (id) {
      debugger
      removeProfileById(id).then(data => {
        debugger
      })
    }
  },

  computed: {
    errorLoadMessage () {
      return profile.GET_PROFILE_FAILED.text
    },

    isProfileFailed () {
      return !this.isLoading && !!this.errorMessage
    }
  }
}
</script>


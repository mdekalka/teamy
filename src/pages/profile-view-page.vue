<template>
  <content-layout class="profile-view-page" :load-screen="isLoading">
    <profile-view v-if="!isLoadFailed && !isDeleted" :profile="profile" @on-remove="removeProfile" />
    <message-panel :show="isLoadFailed" :message="loadErrorMessage" type="danger" />
    <message-panel :show="isDeleted" :message="deleteSuccessMessage" />
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'
import profileView from '@/components/profile/profile-view/profile-view'
import messagePanel from '@/components/common/message-panel'

import { profile } from '@/config/messages'

export default {
  name: 'profile-view-page',

  components: { contentLayout, profileView, messagePanel },

  data () {
    return {
      isDeleted: false
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
      this.$store.dispatch('getProfileById', this.$route.params.id)
    },

    removeProfile (id) {
      this.$store.dispatch('removeProfileById', id).then(_ => {
        this.isDeleted = true
      })
    }
  },

  computed: {
    loadErrorMessage () {
      return profile.GET_PROFILE_FAILED.text
    },

    deleteSuccessMessage () {
      return profile.DELETE_PROFILE_SUCCESS.text
    },

    profile () {
      return this.$store.getters.profileInfo.profile
    },

    isLoading () {
      return this.$store.getters.profileInfo.isLoading
    },

    isLoadFailed () {
      return !this.isLoading && !!this.$store.getters.profileInfo.errorMessage
    }
  }
}
</script>


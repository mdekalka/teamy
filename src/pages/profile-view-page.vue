<template>
  <content-layout class="profile-view-page" :load-screen="isLoading">
    <profile-view v-if="!isLoadFailed && !isDeleteFailed && !isDeleted" :profile="profile" :delete-state="isDeleted" @on-remove="removeProfile" />
    <message-panel :show="isLoadFailed" :message="loadErrorMessage" type="danger" />
    <message-panel :show="isDeleted || !!errorsInfo.deleteError" :message="deleteErrorInfo.message" :type="deleteErrorInfo.type" />
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
      errorsInfo: {
        loadError: '',
        deleteError: ''
      }
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
        this.errorsInfo.loadError = ''
        this.profile = profile
      })
      .catch(({ message }) => {
        this.errorsInfo.loadError = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    },

    removeProfile (id) {
      this.isLoading = true

      removeProfileById(id).then(_ => {
        this.errorsInfo.deleteError = ''
        this.isDeleted = true
      })
      .catch(({ message }) => {
        this.this.errorsInfo.deleteError = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  },

  computed: {
    loadErrorMessage () {
      return profile.GET_PROFILE_FAILED.text
    },

    deleteErrorInfo () {
      return {
        message: this.isDeleted ? profile.DELETE_PROFILE_SUCCESS.text : profile.DELETE_PROFILE_FAILED.text,
        type: this.isDeleted ? '' : 'danger'
      }
    },

    isLoadFailed () {
      return !this.isLoading && !!this.errorsInfo.loadError
    },

    isDeleteFailed () {
      return !this.isLoading && !!this.errorsInfo.deleteError
    }
  }
}
</script>


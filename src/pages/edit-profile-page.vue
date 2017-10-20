<template>
  <div class="edit-profile-page page">
    <b-container fluid>
      <b-row v-if="!isProfileFailed">
        <b-col col md="6">
          <header-title :title="'Edit profile:'" underline/>
          <profile-form :form="form" @handle-profile="updateProfile" :loading="isLoading" :submit-title="'Update'" />
        </b-col>
        <b-col col md="6">
          <header-title :title="'Profile preview:'" />
          <profile-preview :profile="form" :is-loading="isLoading" />
          <message-panel :show="isUpdateSuccess" :message="activeMessage.message" :type="activeMessage.type" :show-time="showTime" />
        </b-col>
      </b-row>
      <message-panel :show="isProfileFailed" :message="getFailedMessage" :type="'danger'" />
    </b-container>
  </div>
</template>

<script>
import profileForm from '@/components/profile/profile-form/profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'
import messagePanel from '@/components/common/message-panel'

import profileModel from '@/components/profile/profile-model'
import { getProfileById, updateProfileById } from '@/components/profile/profile-api'
import { profile } from '@/config/messages'

export default {
  name: 'create-profile-page',

  components: { profileForm, profilePreview, headerTitle, messagePanel },

  data () {
    return {
      showTime: 1500,
      isUpdated: false,
      isLoading: false,
      errorMessage: '',
      form: profileModel
    }
  },

  created () {
    this.loadProfile()
  },

  watch: {
    '$route': 'loadProfile'
  },

  methods: {
    handleError ({ message }) {
      this.errorMessage = message
    },

    handleFinally () {
      this.isLoading = false
    },

    loadProfile () {
      this.isLoading = true

      getProfileById(this.$route.params.id).then(profile => {
        this.errorMessage = ''
        this.form = profile || profileModel
      })
      .catch(this.handleError)
      .finally(this.handleFinally)
    },

    updateProfile (profile) {
      if (this.errorMessage) {
        return
      }

      this.isLoading = true

      updateProfileById(this.$route.params.id, profile).then(updatedProfile => {
        this.errorMessage = ''
        this.isUpdated = true
        this.form = updatedProfile.data
      })
      .catch(this.handleError)
      .finally(this.handleFinally)
    }
  },

  computed: {
    activeMessage () {
      return {
        message: this.errorMessage ? profile.CREATE_PROFILE_FAILED.text : profile.CREATE_PROFILE_SUCCESS.text,
        type: this.errorMessage ? 'danger' : ''
      }
    },

    isProfileFailed () {
      return !this.isLoading && !!this.errorMessage
    },

    getFailedMessage () {
      return profile.GET_PROFILE_FAILED.text
    },

    isUpdateSuccess () {
      return this.isUpdated && !this.isLoading
    }
  }
}
</script>


<template>
  <div class="create-profile-page page">
    <b-container fluid>
      <b-row>
        <b-col col md="6">
          <header-title :title="'Create new profile:'" underline/>
          <profile-form :form="form" @handle-profile="createProfile" :loading="isLoading" :submit-title="'Create'" />
        </b-col>
        <b-col col md="6">
          <header-title :title="'Profile preview:'" />
          <profile-preview :profile="form" :is-loading="isLoading" />
          <message-panel :show="isShown" :message="activeMessage.message" :type="activeMessage.type" :show-time="showTime" />
          <message-panel :show="isRedirect" :message="redirectMessage" :show-time="redirectTime" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'

import profileForm from '@/components/profile/profile-form/profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'
import messagePanel from '@/components/common/message-panel'

import profileMode from '@/components/profile/profile-model'
import { addProfile } from '@/components/profile/profile-api'
import { profile } from '@/config/messages'

export default {
  name: 'create-profile-page',

  components: { profileForm, profilePreview, headerTitle, messagePanel },

  data () {
    return {
      showTime: 2000,
      redirectTime: 2000,
      afterCreating: false,
      isRedirect: false,
      isLoading: false,
      errorMessage: '',
      form: profileMode
    }
  },

  methods: {
    createProfile (profile) {
      const newProfile = { ...profile, registered: moment() }
      this.afterCreating = true
      this.isLoading = true

      addProfile(newProfile).then(profile => {
        this.errorMessage = ''
        this.form = profileMode
        this.isRedirect = true

        setTimeout(_ => {
          this.$router.push({
            name: 'profile-view',
            params: { id: profile.id }
          })
        }, this.redirectTime)
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  },

  computed: {
    activeMessage () {
      return {
        message: this.errorMessage ? profile.CREATE_PROFILE_FAILED.text : profile.CREATE_PROFILE_SUCCESS.text,
        type: this.errorMessage ? 'danger' : ''
      }
    },

    redirectMessage () {
      return profile.REDIRECT_TO_PROFILE.text
    },

    isShown () {
      return this.afterCreating && !this.isLoading
    }
  }
}
</script>


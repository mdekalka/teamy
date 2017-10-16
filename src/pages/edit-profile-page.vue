<template>
  <div class="edit-profile-page page">
    <b-container fluid>
      <b-row>
        <b-col col md="6">
          <header-title :title="'Edit profile:'" underline/>
          <profile-form :form="form" @create-profile="createProfile" :loading="isLoading" />
        </b-col>
        <b-col col md="6">
          <header-title :title="'Profile preview:'" />
          <profile-preview :profile="form" :is-loading="isLoading" />
          <message-panel :show="isShown" :message="activeMessage.message" :type="activeMessage.type" :show-time="showTime" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import cuid from 'cuid'

import profileForm from '@/components/profile/profile-form/profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'
import messagePanel from '@/components/common/message-panel'

import profileMode from '@/components/profile/profile-model'
import userList from '@/mocks/userList'
import { addUser } from '@/components/profile/profile-api'
import { profile } from '@/config/messages'

export default {
  name: 'create-profile-page',

  components: { profileForm, profilePreview, headerTitle, messagePanel },

  data () {
    return {
      showTime: 1500,
      afterCreating: false,
      isLoading: false,
      errorMessage: '',
      form: userList[0]
    }
  },

  methods: {
    createProfile (profile) {
      const newProfile = { ...profile, id: cuid() }
      this.afterCreating = true
      this.isLoading = true

      addUser(newProfile).then(_ => {
        this.errorMessage = ''
        this.form = profileMode
      })
      .catch(err => {
        this.errorMessage = err.status
        console.log(err)
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

    isShown () {
      return this.afterCreating && !this.isLoading
    }
  }
}
</script>


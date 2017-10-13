<template>
  <div class="create-profile-page page">
    <b-container fluid>
      <b-row>
        <b-col col md="6">
          <header-title :title="'Create new profile:'" underline/>
          <new-profile-form :form="form" @create-profile="createProfile" />
        </b-col>
        <b-col col md="6">
          <header-title :title="'Profile preview:'" />
          <profile-preview :profile="form" />
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import newProfileForm from '@/components/profile/new-profile-form/new-profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'

import profileMode from '@/components/profile/profile-model'

export default {
  name: 'create-profile-page',

  components: { newProfileForm, profilePreview, headerTitle },

  data () {
    return {
      form: profileMode
    }
  },

  methods: {
    createProfile () {

    }
  }
}
</script>


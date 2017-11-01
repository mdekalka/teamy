<template>
  <content-layout class="profile-list-page" :load-screen="isLoading">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="options-panel">
            <div class="btn-group">
              <b-button class="toggle-panel" @click="onTogglePanelClick">
                <i class="fa fa-filter" aria-hidden="true"></i>
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col col md="4" v-for="profile in profiles" :key="profile.id">
          <profile-card :profile="profile" :route="profile.id" @handle-remove="removeProfile" />
        </b-col>
      </b-row>
    </b-container>
     <side-panel :is-open="isPanelOpen">
    </side-panel>
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'
import profileCard from '@/components/profile/profile-card/profile-card'
import sidePanel from '@/components/common/side-panel'

import loader from '@/components/common/loader'

export default {
  name: 'profile-list-page',

  components: {
    contentLayout,
    profileCard,
    sidePanel,
    loader
  },

  data () {
    return {
      isPanelOpen: false
    }
  },

  created () {
    this.loadProfiles()
  },

  methods: {
    loadProfiles () {
      this.$store.dispatch('getProfiles')
    },

    removeProfile (id) {
      this.$store.dispatch('removeProfileById', id)
    },

    onTogglePanelClick () {
      this.isPanelOpen = true
    }
  },

  computed: {
    profiles () {
      return this.$store.getters.profileInfo.profiles
    },

    isLoading () {
      return this.$store.getters.profileInfo.isLoading
    },

    errorMessage () {
      return this.$store.getters.profileInfo.errorMessage
    }
  }
}
</script>

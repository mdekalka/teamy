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
import sidePanel from '@/components/side-panel/side-panel'

import loader from '@/components/loader/loader'

import { getProfiles, removeProfileById } from '@/components/profile/profile-api'
import { extendWithColors } from '@/components/profile/profile-service'

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
      profiles: [],
      isLoading: false,
      errorMessage: '',
      isPanelOpen: false
    }
  },

  created () {
    this.loadProfiles()
  },

  methods: {
    loadProfiles () {
      this.isLoading = true

      getProfiles().then(profiles => {
        this.errorMessage = ''
        this.profiles = profiles.map(profile => {
          return { ...profile, roles: extendWithColors(profile.roles) }
        })
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(() => {
        this.isLoading = false
      })
    },

    removeProfile (id) {
      this.isLoading = true

      removeProfileById(id).then(_ => {
        this.errorMessage = ''
        this.profiles = this.profiles.filter(profile => profile.id !== id)
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    },

    onTogglePanelClick () {
      this.isPanelOpen = true
    }
  }
}
</script>

<style lang="scss">
.profile-list-page {
  flex: 0 1 100%;

  .options-panel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}


</style>



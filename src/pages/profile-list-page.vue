<template>
  <content-layout class="profile-list-page" :load-screen="isLoading">
    <b-container fluid>
      <b-row>
        <b-col>
          <header-title :title="'Profile list:'" underline/>
          <profile-view-filter :query="filterQuery" @on-clear="onClearFilter" @input="onFilterInput" />
        </b-col>
      </b-row>
      <b-row>
        <b-col col md="4" v-for="profile in filteredProfiles" :key="profile.id">
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
import profileViewFilter from '@/components/profile/profile-view-filter/profile-view-filter'
import sidePanel from '@/components/common/side-panel'
import headerTitle from '@/components/common/header-title.vue'
import loader from '@/components/common/loader'

import { getFullName } from '@/components/profile/profile-model'

export default {
  name: 'profile-list-page',

  components: {
    contentLayout,
    profileCard,
    profileViewFilter,
    sidePanel,
    headerTitle,
    loader
  },

  data () {
    return {
      filterQuery: '',
      filterTaskCount: 0,
      filterRoles: {},
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
    },

    onFilterInput (value) {
      this.filterQuery = value
    },

    onFilterToggle (selected) {
      // this.filterRoles[selected] = true;
    },

    onClearFilter () {
      this.filterQuery = ''
    }
  },

  computed: {
    profiles () {
      return this.$store.getters.profileInfo.profiles
    },

    filteredProfiles () {
      const regExp = new RegExp(this.filterQuery, 'i')

      return this.profiles.filter(profile => {
        return regExp.test(getFullName(profile.name))
      })
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

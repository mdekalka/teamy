<template>
  <content-layout class="profile-list-page" :load-screen="isLoading">
    <b-container fluid>
      <b-row>
        <b-col>
          <header-title :title="'Profile list:'" underline />
          <profile-view-filter
            :filters="filters" @on-clear="onClearFilter" @input="onFilterInput" @on-select="onSelectRoles"
            @on-clear-all="onClearAll" :is-filter-empty="isFilterEmpty" />
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
import isEmpty from 'lodash/isEmpty'

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
      filters: {
        filterQuery: '',
        filterTaskCount: 0,
        filterRoles: {}
      },
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
      this.filters.filterQuery = value
    },

    onClearFilter () {
      this.filters.filterQuery = ''
    },

    onSelectRoles (role) {
      // Vue is still cool. Detection caveats: https://vuejs.org/v2/guide/reactivity.html
      if (this.filters.filterRoles[role.id]) {
        this.$delete(this.filters.filterRoles, role.key)
      } else {
        this.$set(this.filters.filterRoles, role.key, role)
      }
    },

    onClearAll () {
      this.filters = {
        filterQuery: '',
        filterTaskCount: 0,
        filterRoles: {}
      }
    }
  },

  computed: {
    profiles () {
      return this.$store.getters.profileInfo.profiles
    },

    filteredProfiles () {
      const regExp = new RegExp(this.filters.filterQuery, 'i')

      return this.profiles.filter(profile => {
        if (profile.tasks.length < this.filters.filterTaskCount) {
          return false
        }

        if (!isEmpty(this.filters.filterRoles)) {
          let isRolesIncludes = false

          for (let i = 0; i < profile.roles.length; i++) {
            if (this.filters.filterRoles[profile.roles[i].key]) {
              isRolesIncludes = true
              break
            }
          }

          if (!isRolesIncludes) {
            return false
          }
        }

        return regExp.test(getFullName(profile.name))
      })
    },

    isLoading () {
      return this.$store.getters.profileInfo.isLoading
    },

    isFilterEmpty () {
      return !this.filters.filterQuery && !this.filters.filterTaskCount && isEmpty(this.filters.filterRoles)
    },

    errorMessage () {
      return this.$store.getters.profileInfo.errorMessage
    }
  }
}
</script>

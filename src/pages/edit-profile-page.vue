<template>
<content-layout class="edit-profile-page">
  <b-container fluid>
    <b-row v-if="!isProfileFailed">
      <b-col col md="6">
        <header-title :title="'Edit profile:'" underline/>
        <profile-form
          :form="form" @handle-profile="updateProfile" @change-avatar="changeAvatar" @clear-image="clearImage"
          :is-shown-map="true" :loading="isLoading" @marker-move="onMarkerMove" @marker-drag-end="onMarkerDragEnd" :submit-title="'Update'"
          :filename="filename" :location-preview="locationPreview" :config="map" />
      </b-col>
      <b-col col md="6">
        <header-title :title="'Profile preview:'" />
        <profile-preview :profile="form" :is-loading="isLoading" />
        <message-panel :show="isUpdateSuccess" :message="activeMessage.message" :type="activeMessage.type" :show-time="showTime" />
      </b-col>
    </b-row>
    <message-panel :show="isProfileFailed" :message="getFailedMessage" :type="'danger'" />
  </b-container>
</content-layout>
</template>

<script>
import L from 'leaflet'
import cloneDeep from 'lodash/cloneDeep'

import contentLayout from '@/components/common/content-layout'
import profileForm from '@/components/profile/profile-form/profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'
import messagePanel from '@/components/common/message-panel'

import MapModel from '@/components/common/marker-map/map-model'
import ProfileModel, { getLocation } from '@/components/profile/profile-model'
import { profile } from '@/config/messages'
import { getGoogleLocation } from '@/utils/api'
import { formatGoogleAddress } from '@/utils/utils'

export default {
  name: 'create-profile-page',

  components: { contentLayout, profileForm, profilePreview, headerTitle, messagePanel },

  data () {
    return {
      showTime: 1500,
      isUpdated: false,
      filename: '',
      originAvatar: '',
      locationPreview: '',
      form: new ProfileModel(),
      map: new MapModel()
    }
  },

  created () {
    this.loadProfile()
  },

  methods: {
    onMarkerMove (event) {
      this.map.marker.position = event.latlng
    },

    onMarkerDragEnd () {
      this.getLocation()
    },

    getLocation () {
      return getGoogleLocation(this.map.marker.position).then(data => {
        this.profileLocation = formatGoogleAddress(data)
        this.locationPreview = getLocation(this.profileLocation)
      })
      .catch(({ message }) => {
        this.locationPreview = message
      })
    },

    changeAvatar ({ image, filename }) {
      this.originAvatar = this.form.picture.large

      this.form.picture.large = image
      this.filename = filename
    },

    clearImage () {
      this.form.picture.large = this.originAvatar
      this.filename = ''
    },

    loadProfile () {
      this.$store.dispatch('getProfileById', this.$route.params.id).then(_ => {
        this.form = cloneDeep(this.profile)

        const coords = L.latLng(parseFloat(this.form.location.latitude), parseFloat(this.form.location.longitude))

        this.locationPreview = getLocation(this.form.location)
        this.map.marker.position = coords
        this.map.center = coords
      })
    },

    updateProfile (profile) {
      if (this.errorMessage) {
        return
      }

      this.$store.dispatch('updateProfileById', { id: this.$route.params.id, data: profile }).then(_ => {
        this.$scrollTo(window)
        this.isUpdated = true
        this.form = cloneDeep(this.profile)
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

    profile () {
      return this.$store.getters.profileInfo.profile
    },

    isLoading () {
      return this.$store.getters.profileInfo.isLoading
    },

    errorMessage () {
      return this.$store.getters.profileInfo.errorMessage
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


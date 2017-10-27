<template>
<content-layout class="create-profile-page" >
  <b-container fluid>
    <b-row>
      <b-col col md="6">
        <header-title :title="'Create new profile:'" underline/>
        <profile-form
          :form="form" @handle-profile="createProfile" :loading="isLoading" :submit-title="'Create'" :location-preview="locationPreview"
          :is-shown-map="true" @map-click="onMapClick" @marker-move="onMarkerMove" @marker-drag-end="onMarkerDragEnd" :config="map" />
      </b-col>
      <b-col col md="6">
        <header-title :title="'Profile preview:'" />
        <profile-preview :profile="form" :is-loading="isLoading" />
        <message-panel :show="isShown" :message="activeMessage.message" :type="activeMessage.type" :show-time="showTime" />
        <message-panel :show="isRedirect" :message="redirectMessage" :show-time="redirectTime" />
      </b-col>
    </b-row>
  </b-container>
</content-layout>
</template>

<script>
import moment from 'moment'

import contentLayout from '@/components/common/content-layout'
import profileForm from '@/components/profile/profile-form/profile-form.vue'
import profilePreview from '@/components/profile/profile-preview/profile-preview.vue'
import headerTitle from '@/components/common/header-title.vue'
import messagePanel from '@/components/common/message-panel'

import ProfileModel, { getLocation } from '@/components/profile/profile-model'
import MapModel from '@/components/common/marker-map/map-model'
import { addProfile } from '@/components/profile/profile-api'
import { profile } from '@/config/messages'
import { getGoogleLocation } from '@/utils/api'
import { formatGoogleAddress } from '@/utils/utils'

export default {
  name: 'create-profile-page',

  components: { contentLayout, profileForm, profilePreview, headerTitle, messagePanel },

  data () {
    return {
      showTime: 2000,
      redirectTime: 2000,
      afterCreating: false,
      isRedirect: false,
      isLoading: false,
      profileLocation: {},
      errorMessage: '',
      locationPreview: 'Click on the map to select you location',
      form: new ProfileModel(),
      map: new MapModel()
    }
  },

  methods: {
    createProfile (profile) {
      const newProfile = { ...profile, registered: moment(), location: this.extendWithLocation(profile.location) }

      this.afterCreating = true
      this.isLoading = true

      addProfile(newProfile).then(profile => {
        this.errorMessage = ''
        this.form = new ProfileModel()
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
    },

    extendWithLocation (location) {
      return {...location, ...this.profileLocation, latitude: this.map.marker.position.lat, longitude: this.map.marker.position.lng}
    },

    onMapClick (event) {
      if (!this.map.isMarkerDefined) {
        this.map.isMarkerDefined = true
        this.map.marker = { ...this.map.marker, visible: true, position: event.latlng }
        this.getLocation()
      }
    },

    onMarkerMove (event) {
      this.map.marker.position = event
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


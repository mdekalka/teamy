<template>
  <b-container fluid>
    <b-row>
      <b-col class="profile-view">
        <b-row>
          <b-col md="6">
            <div class="profile-box box-main">
              <div class="block-avatar">
                <img :src="profileAvatar" class="profile-avatar" alt="profile-avatar">
                <div>
                  <h1 class="profile-name">{{fullName}}</h1>
                  <div class="profile-title">{{profile.title}}</div>
                </div>
              </div>
              <profile-view-tools :id="profile.id" @on-remove="removeHandler" />
            </div>
          </b-col>
          <b-col md="6">
            <div class="profile-box box-additional">
              <item-row offset="100" title="Phone:">{{profile.phone || noValue}}</item-row>
              <item-row offset="100" title="Email:">{{profile.email || noValue}}</item-row>
              <item-row offset="100" title="Location:">{{fullLocation || noValue}}</item-row>
              <item-row offset="100" title="Registered Date:">{{registeredDate}}</item-row>
              <item-row offset="100" title="Location:" />
              <marker-map :is-shown="isShowMap" :config="map" />
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'
import L from 'leaflet'

import itemRow from '@/components/common/item-row'
import profileViewTools from '@/components/profile/profile-view-tools/profile-view-tools'
import markerMap from '@/components/common/marker-map/marker-map'
import markerMapModel from '@/components/common/marker-map/marker-map-model'

import profileModel, { getLocation } from '@/components/profile/profile-model'
import defaultAvatar from '@/assets/default-avatar.png'
import { DATE_FORMAT, NO_VALUE } from '@/config/config'

export default {
  name: 'profile-view',

  components: { itemRow, profileViewTools, markerMap },

  props: {
    profile: {
      type: Object,
      default: profileModel
    },
    'no-value': {
      type: String,
      default: NO_VALUE
    },
    'on-remove': {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      map: { ...markerMapModel, zoom: 6 }
    }
  },

  watch: {
    'profile.location': function (newVal) {
      // const coords = { lat: parseFloat(newVal.latitude), lng: parseFloat(newVal.longitude) }
      const coords = L.latLng(parseFloat(newVal.latitude), parseFloat(newVal.longitude))
      this.map.marker.position = coords
      this.map.marker.center = coords
    }
  },

  methods: {
    removeHandler (id) {
      this.$emit('on-remove', id)
    }
  },

  computed: {
    fullName () {
      return `${this.profile.name.first} ${this.profile.name.last}`
    },

    fullLocation () {
      return getLocation(this.profile.location)
    },

    registeredDate () {
      return moment(this.profile.registered).format(DATE_FORMAT.default)
    },

    profileAvatar () {
      return this.profile.picture.large || defaultAvatar
    },

    isShowMap () {
      return !!(this.profile.location.latitude && this.profile.location.longitude)
    }
  }
}
</script>

<style lang="scss">
.profile-view {
  background: linear-gradient(120deg, $black-1 50%, $black-2 50%);

  .profile-view-tools {
    margin-top: 20px;
  }

  .profile-box {
    padding: 25px 0;
  }

  .block-avatar {
    display: flex;
    align-items: center;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .profile-title {
    color: $gray-5;
    font-size: 20px;
  }

  .profile-name {
    color: $green-1;
    font-size: 46px;

    &::after {
      content: '';
      height: 20px;
      width: 10px;
      background-color: $green-1;
    }
  }

  .box-main {
    padding-right: 60px;
  }

  .box-additional {
    padding-left: 60px;
  }
}
</style>



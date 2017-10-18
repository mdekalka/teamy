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
                  <router-link v-if="profile.id" :to="{ name: 'edit-profile', params: { id: profile.id  }}" class="btn-icon">
                    <i class="fa fw fa-pencil" aria-hidden="true"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="profile-box box-additional">
              <item-row offset="100" title="Phone:">{{profile.phone}}</item-row>
              <item-row offset="100" title="Email:">{{profile.email}}</item-row>
              <item-row offset="100" title="Location:">{{fullLocation}}</item-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import itemRow from '@/components/common/item-row'

import profileModel from '@/components/profile/profile-model'
import defaultAvatar from '@/assets/default-avatar.png'

export default {
  name: 'profile-view',

  components: { itemRow },

  props: {
    profile: {
      type: Object,
      default: profileModel
    }
  },

  computed: {
    fullName () {
      return `${this.profile.name.first} ${this.profile.name.last}`
    },

    fullLocation () {
      return `${this.profile.location.city}, ${this.profile.location.street}`
    },

    profileAvatar () {
      return this.profile.picture.large || defaultAvatar
    }
  }
}
</script>

<style lang="scss">
.profile-view {
  background: linear-gradient(120deg, $black-1 50%, $black-2 50%);

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



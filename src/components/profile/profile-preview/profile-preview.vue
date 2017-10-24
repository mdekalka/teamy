<template>
  <div class="profile-preview">
    <div class="profile-header">
      <img class="profile-avatar" :src="profileAvatar" alt="">
      <div class="profile-meta">
        <div class="profile-name">{{profile.name.first}} {{profile.name.last}}</div>
        <div class="profile-title">{{profile.title}}</div>
      </div>
    </div>
    <div v-if="profile.email || profile.phone" class="profile-body">
      <item-row title="Email:">{{profile.email}}</item-row>
      <item-row title="Phone:">{{profile.phone}}</item-row>
    </div>
    <inner-loader v-if="isLoading" />
  </div>
</template>

<script>
import innerLoader from '@/components/common/inner-loader'
import itemRow from '@/components/common/item-row'

import profileModel from '@/components/profile/profile-model'
import defaultAvatar from '@/assets/default-avatar.png'

export default {
  name: 'profile-preview',

  components: { innerLoader, itemRow },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Object,
      default: profileModel
    }
  },

  computed: {
    profileAvatar () {
      return this.profile.picture.large || defaultAvatar
    }
  }
}
</script>

<style lang="scss">
.profile-preview {
  position: relative;
}

// TODO: Refactor this to one single style component(user-profile/profile)
.profile-header {
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: $black-1;
  border-bottom: 2px solid $green-3;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 15px;
}

.profile-name {
  margin-bottom: 6px;
}

.profile-title {
  color: $gray-5;
}

.profile-body {
  padding: 25px;
  background-color: $black-2;
  font-size: 15px;
}
</style>

<template>
  <div class="profile-preview">
    <div class="profile-header">
      <img class="profile-avatar" src="~@/assets/default-avatar.png" alt="">
      <div class="profile-meta">
        <div class="profile-name">{{profile.name.first}} {{profile.name.last}}</div>
        <div class="profile-title">{{profile.title}}</div>
      </div>
    </div>
    <div v-if="profile.email || profile.phone" class="profile-body">
      <div><span v-show="profile.email" class="text-label">Email:</span> {{profile.email}}</div>
      <div><span v-show="profile.phone" class="text-label">Phone:</span> {{profile.phone}}</div>
    </div>
    <inner-loader v-if="isLoading" />
  </div>
</template>

<script>
import innerLoader from '@/components/inner-loader/inner-loader'

export default {
  name: 'profile-preview',

  components: { innerLoader },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Object,
      default: {
        name: {}
      }
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

.text-label {
  color: $gray-2;
}

</style>

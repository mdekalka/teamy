<template>
  <div class="profile-preview">
    <div class="profile-header">
       <img class="profile-avatar" src="~@/assets/default-avatar.png" alt="">
       <div>{{profile.name.first}}</div>
       <div>{{profile.name.last}}</div>
       <div>{{profile.title}}</div>
       <div>{{profile.email}}</div>
       <div>{{profile.phone}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-preview',

  props: {
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

.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

</style>

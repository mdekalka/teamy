<template>
  <div class="profile-card">
    <div class="profile-card-header">
      <img class="profile-avatar" :src="profile.picture.large" alt="profile avatar" />
      <div class="profile-meta">
        <div class="profile-name">{{profile.name.first}} {{profile.name.last}}</div>
        <div class="profile-title">{{profile.title}}</div>
      </div>
      <slot name="header-tools"></slot>
    </div>
    <div class="profile-card-body">

    </div>
    <div class="profile-card-footer" v-if="profile.roles.length">
      <div class="profile-skills">Roles:</div>
      <ul class="profile-skills-list">
        <li v-for="role in profile.roles" :style="{color: role.color, borderColor: role.color}" :key="role.key">{{role.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-card',

  props: {
    profile: {
      type: Object,
      default: {
        picture: {},
        name: {},
        skills: []
      }
    }
  }
}
</script>

<style lang="scss">
$card-offset: 25px;
// https://vue-loader.vuejs.org/en/configurations/pre-processors.html
.profile-card {
  position: relative;
  border-radius: 4px;
  margin-bottom: 25px;

  &-header {
    padding: $card-offset;
    background-color: $black-1;
    border-bottom: 2px solid $green-3;
    display: flex;
    align-items: center;
  }

  &-body {
    padding: $card-offset;
    background-color: $black-2;
  }

  &-footer {
    display: flex;
    align-items: center;
    padding: $card-offset;
    background-color: $black-1;
    border-top: 2px solid #394d65;
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

  .profile-skills {
    margin-right: 15px;

    &-list {
      margin-top: -10px;

      > li {
        margin-right: 8px;
        margin-top: 10px;
        padding: 4px 12px;
        display: inline-block;
        border: 1px solid $gray-5;
        border-radius: 10px;
      }
    }
  }
}
</style>



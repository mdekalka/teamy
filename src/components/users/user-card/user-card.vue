<template>
  <div class="user-card">
    <div class="user-card-header">
      <img class="user-avatar" :src="user.picture.large" alt="user avatar" />
      <div class="user-meta">
        <div class="user-name">{{user.name.first}} {{user.name.last}}</div>
        <div class="user-title">{{user.title}}</div>
      </div>
    </div>
    <div class="user-card-body">

    </div>
    <div class="user-card-footer" v-if="user.roles.length">
      <div class="user-skills">Skills:</div>
      <ul class="user-skills-list">
        <li v-for="role in user.roles" :style="{color: role.color, borderColor: role.color}" :key="role.key">{{role.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-card',

  props: {
    user: {
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
.user-card {
  border-radius: 4px;
  margin-bottom: 25px;

  &-header {
    padding: $card-offset;
    background-color: $black-1;
    border-bottom: 2px solid #42663d;
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

  .user-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .user-name {
    margin-bottom: 6px;
  }

  .user-title {
    color: #73879c;
  }

  .user-skills {
    margin-right: 15px;

    &-list {
      margin-top: -10px;

      > li {
        margin-right: 8px;
        margin-top: 10px;
        padding: 4px 12px;
        display: inline-block;
        border: 1px solid #73879c;
        border-radius: 10px;
      }
    }
  }
}
</style>



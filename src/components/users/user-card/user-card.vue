<template>
  <div class="user-card">
    <div class="user-card-header">
      <img :src="user.picture.large" alt="user avatar" />
      <div class="user-meta">
        <div class="user-name">{{user.firs}} {{user.last}}</div>
        <div class="user-title">{{user.title}}</div>
      </div>
    </div>
    <div class="user-card-body">

    </div>
  </div>
</template>

<script>
export default {
  name: 'user-card',

  props: {
    user: {
      type: Array,
      default: {
        picture: {}
      }
    }
  }
}
</script>

<style lang="scss">
// https://vue-loader.vuejs.org/en/configurations/pre-processors.html
.user-list {
  padding: 25px;
  
  &-header {
    background-color: $blue-1;
  }

  &-heabodyder {
    background-color: $blue-2;
  }
}
</style>



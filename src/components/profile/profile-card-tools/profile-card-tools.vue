<template>
  <div class="profile-card-tools">
    <button class="btn-icon" v-b-toggle.accordion1 @click="$emit('handle-collapse')">
      <i :class="['fa', showCollapse ? 'fa-compress' : 'fa-expand']" aria-hidden="true"></i>
    </button>
    <router-link :to="{ name: 'profile-view', params: { id: route }}" class="btn-icon">
      <i class="fa fw fa-link" aria-hidden="true"></i>
    </router-link>
    <router-link :to="{ name: 'edit-profile', params: { id: route }}" class="btn-icon">
      <i class="fa fw fa-pencil" aria-hidden="true"></i>
    </router-link>
    <button class="btn-icon danger" @click="$emit('handle-remove', route)"><i class="fa fw fa-trash" aria-hidden="true"></i></button>
  </div>
</template>

<script>
export default {
  name: 'profile-card-tools',

  props: {
    route: {
      type: [String, Number],
      default: null
    },
    'show-collapse': {
      type: Boolean,
      default: false
    },
    'handle-remove': {
      type: Function,
      default: () => {}
    },
    'handle-collapse': {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.profile-card-tools {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-flex;
}
</style>



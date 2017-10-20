<template>
  <div class="profile-view-tools">
    <router-link v-if="id" :to="{ name: 'edit-profile', params: { id: id  }}" class="btn-icon">
      <i class="fa fw fa-pencil" aria-hidden="true"></i>
    </router-link>
    <button @click="$emit('on-remove', id)" class="btn-icon danger">
      <i class="fa fw fa-trash" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'profile-view-tools',

  props: {
    id: {
      type: [String, Number],
      default: null
    },
    'on-remove': {
      type: Function,
      default: () => {}
    }
  }
}
</script>


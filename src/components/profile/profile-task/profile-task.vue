<template>
  <div class="profile-task">
    <router-link :to="{ name: 'task-view', params: { id: route }}" class="profile-task-name" :title="name">{{name}}</router-link>
    <type-mark :type="type" :title="type" />
    <div class="profile-task-status">{{status}}</div>
  </div>
</template>

<script>
import typeMark from '@/components/common/type-mark'

export default {
  name: 'profile-task',

  components: { typeMark },

  props: {
    name: {
      type: String,
      default: ''
    },
    route: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.profile-task {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  .profile-task-name {
    @include text-overflow();
  }

  .profile-task-name,
  .profile-task-status,
  .type-mark {
    margin-right: 10px;
  }

  .profile-task-status {
    margin-right: 0;
    font-size: 14px;
    flex-shrink: 0;
  }
}
</style>



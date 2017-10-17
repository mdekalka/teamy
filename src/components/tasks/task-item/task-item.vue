<template>
  <li @click="$emit('on-item-click', task.id)" :class="['task-item', task.id === activeId ? 'active': '', task.priority]">
    <div class="task-header">
      <div class="task-header-left">
        <type-mark :type="task.type" v-b-tooltip.top :title="task.type" />
        <router-link :to="{ name: 'task', params: { id: task.id }}" class="task-name">{{task.name}}</router-link>
      </div>
      <div class="task-header-right">
        <priority-mark :color="task.priority" v-b-tooltip.left :title="task.priority" />
         <div class="task-assignee-avatar" v-b-tooltip.top container="task-list" :title="fullName">
          <img :src="task.assignee.picture.thumbnail" class="avatar-image" alt="user avatar">
        </div>
      </div>
    </div>
    <div class="task-body">
      <div class="task-labels" v-if="task.labels.length">
        <span class="task-label" v-for="(label, index) in task.labels" :key="index">{{label}}</span>
      </div>
      <div class="task-created-date">created date</div>
    </div>
  </li>
</template>

<script>
import priorityMark from '@/components/priority-mark/priority-mark'
import typeMark from '@/components/type-mark/type-mark'
import tasksModel from '@/components/tasks/tasks-model'

export default {
  name: 'task-item',

  components: { priorityMark, typeMark },

  props: {
    task: {
      type: Object,
      default: tasksModel
    },
    'active-id': {
      type: [Number, String],
      default: null
    },
    'on-item-click': {
      type: Function,
      default: () => {}
    }
  },

  computed: {
    hasAssignee () {
      return this.task.assignee && this.task.assignee.id
    },

    fullName () {
      return this.hasAssignee && `${this.task.assignee.name.first} ${this.task.assignee.name.last}`
    }
  }
}
</script>

<style lang="scss">
.task-item {
  padding: 8px 20px;
  background-color: $black-1;
  border: 1px solid $black-2;
  margin-top: -1px;
  transition: background-color .2s ease;
  cursor: move;

  &.active,
  &:hover {
    background-color: $black-2;
  }

  .task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-name {
    color: $main-green;
  }

  .task-body {
    display: inline-flex;
    font-size: 14px;
  }

  .task-created-date {
    color: $gray-1;
  }

  .task-labels {
    margin-right: 10px;

    .task-label {
      margin-right: 6px;
    }
  }

  .type-mark,
  .priority-mark {
    margin-right: 10px;
  }

  .task-assignee-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-block;

    .avatar-image {
      height: 100%;
      width: 100%;
    }
  }
}
</style>



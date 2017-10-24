<template>
  <li :class="['task-item', task.priority]">
    <div class="task-header">
      <div class="task-header-left">
        <type-mark :type="task.type" v-b-tooltip.top :title="task.type" />
        <router-link :to="{ name: 'task-view', params: { id: task.id }}" class="task-name">{{task.name}}</router-link>
      </div>
      <div class="task-header-right">
        <priority-mark :color="task.priority" v-b-tooltip.left :title="task.priority" />
        <div class="task-assignee-avatar" v-if="hasAssignee" :title="fullName">
          <img :src="getProfileAvatar" class="avatar-image" alt="user avatar">
        </div>
      </div>
    </div>
    <div class="task-body">
      <div class="task-labels" v-if="task.labels.length">
        <span class="task-label" v-for="(label, index) in task.labels" :key="index">{{label}}</span>
      </div>
      <div class="task-created-date">{{registeredData}}</div>
      <div>{{task.status}}</div>
    </div>
  </li>
</template>

<script>
import moment from 'moment'

import priorityMark from '@/components/common/priority-mark'
import typeMark from '@/components/common/type-mark'
import tasksModel from '@/components/tasks/tasks-model'

import { DATE_FORMAT } from '@/config/config'
import defaultAvatar from '@/assets/default-avatar.png'

export default {
  name: 'task-item',

  components: { priorityMark, typeMark },

  props: {
    task: {
      type: Object,
      default: tasksModel
    }
  },

  computed: {
    hasAssignee () {
      return this.task.assignee && this.task.assignee.id
    },

    getProfileAvatar () {
      return this.task.assignee.picture.large || defaultAvatar
    },

    fullName () {
      return this.hasAssignee && `${this.task.assignee.name.first} ${this.task.assignee.name.last}`
    },

    registeredData () {
      return moment(this.task.dates.created).format(DATE_FORMAT.default)
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

  &.sortable-chosen {
    background-color: $black;
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
    margin-right: 15px;
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
    display: inline-block;
    width: 35px;
    height: 35px;

    .avatar-image {
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
  }
}
</style>



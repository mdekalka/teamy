<template>
  <b-row class="task-preview">
    <b-col class="task-leftside" md="8">
      <h2 class="task-name">{{task.name}}</h2>
      <task-block label="Priority:">{{task.priority}}</task-block>
      <task-block label="Type:">{{task.type}}</task-block>
      <task-block label="Status:">{{task.status}}</task-block>
      <task-block label="Sprint:">{{task.sprint}}</task-block>
      <task-block label="Labels:">{{task.labels.join(', ')}}</task-block>
      <task-block label="Environment:">{{task.environment}}</task-block>
      <task-block label="Description:">{{task.description}}</task-block>
      <b-tabs pills>
        <b-tab title="Comments:" active>
          <div v-if="task.comments.length">(TBD) Comments here:</div>
        </b-tab>
        <b-tab title="History:" >
          <div v-if="task.history.length">(TBS) History here:</div>
        </b-tab>
      </b-tabs>
    </b-col>
    <b-col class="task-rightside" md="4">
      <task-block label="Reporter:">{{task.reporter}}</task-block>
      <task-block label="Assignee:">
        <img class="task-assignee" :src="profileAvatar" />
        <router-link :to="{ name: 'profile-view', params: { id: this.task.assignee.id }}">{{fullName}}</router-link>
      </task-block>
      <task-block label="Created date:">{{getCreatedDate}}</task-block>
      <task-block label="Updated date:">{{getUpdateData}}</task-block>
      <hr>
      <task-block class="block" :label="`Estimated time (${task.time.estimated} hr):`">
        <b-progress height="16px" :value="task.time.estimated" :max="task.time.estimated" variant="dark"></b-progress>
      </task-block>
      <task-block class="block" :label="`Logged time (${task.time.logged} hr):`">
        <b-progress height="16px" :value="task.time.logged" :max="task.time.estimated" variant="dark"></b-progress>
      </task-block>
    </b-col>
    <inner-loader v-if="isUpdating" />
  </b-row>
</template>

<script>
import moment from 'moment'

import TaskProfileModel from '@/components/tasks/tasks-model'
import { DATE_FORMAT } from '@/config/config'
import defaultAvatar from '@/assets/default-avatar.png'

import taskBlock from '@/components/tasks/task-block/task-block'
import innerLoader from '@/components/common/inner-loader'

export default {
  name: 'task-preview',

  components: { taskBlock, innerLoader },

  props: {
    task: {
      type: Object,
      default: new TaskProfileModel()
    },
    'is-updating': {
      type: Boolean,
      default: false
    }
  },

  computed: {
    fullName () {
      return `${this.task.assignee.name.first || ''} ${this.task.assignee.name.last || ''}`
    },

    getCreatedDate () {
      return moment(this.task.dates.created).format(DATE_FORMAT.default)
    },

    getUpdateData () {
      return moment(this.task.dates.updated).format(DATE_FORMAT.default)
    },

    profileAvatar () {
      return this.task.assignee.picture.large || defaultAvatar
    }
  }
}
</script>

<style lang="scss">
.task-preview {
  position: relative;
  background-color: $black-5;
  padding: 15px 0;

  .task-name {
    display: inline-block;
    font-size: 21px;
    line-height: 1.8;
    color: $main-green;
    border-bottom: 1px solid $green-1;
    margin-bottom: 10px;
  }

  .task-label {
    color: $gray-2;
    margin-bottom: 8px;
  }

  .task-assignee {
    border-radius: 50%;
    margin: 0 4px;
    width: 35px;
    height: 35px;
  }

  .task-row-name {
    color: $gray-2;
  }

  .progress {
    margin-top: 6px;
  }

  .priority-mark {
    margin-left: 4px;
  }

  .tabs {
    margin-top: 35px;
  }
}
</style>



<template>
  <div class="task-profile page">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-breadcrumb :items="routeItems"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="options-panel">
            <b-button v-b-modal.task-edit-modal :disabled="isLoading || !!errorMessage">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row class="task-content" v-if="!isLoading && !errorMessage">
        <b-col class="task-leftside" md="8">
          <h2 class="task-name">{{task.name}}</h2>
          <task-block label="Priority:">
            {{task.priority}}
            <priority-mark :color="task.priority" />
          </task-block>
          <task-block label="Type:">{{task.type}}</task-block>
          <task-block label="Status:">{{task.status}}</task-block>
          <task-block label="Sprint:">{{task.sprint}}</task-block>
          <task-block label="Labels:">{{task.labels.join(', ')}}</task-block>
          <task-block label="Environment:">{{task.environment}}</task-block>
          <task-block label="Description:">{{task.description}}</task-block>
          <b-tabs pills>
            <b-tab title="Comments:" active>
              <div v-if="task.comments.length">saf</div>
            </b-tab>
            <b-tab title="History:" >
              <div v-if="task.history.length">asf</div>
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col class="task-rightside" md="4">
          <task-block label="Reporter:">{{task.reporter}}</task-block>
          <task-block label="Assignee:">
            <div v-if="task.assignee.picture.thumbnail">
              <img class="task-assignee" :src="task.assignee.picture.thumbnail" />
              {{fullName}}
            </div>
          </task-block>
          <task-block label="Created date:">{{task.dates.created}}</task-block>
          <task-block label="Updated date:">{{task.dates.updated}}</task-block>
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
      <loader v-else />
    </b-container>
    <div>

    </div>
    <task-edit-modal :on-cancel="onModalClose" :on-apply="onModalApply" :task="taskEdit" />
  </div>
</template>

<script>
import { getTaskById, updateTaskById } from '@/components/tasks/tasks-api'
import { getProfileById } from '@/components/profile/profile-api'
import taskProfileModel from '@/components/tasks/tasks-model'

import priorityMark from '@/components/priority-mark/priority-mark'
import loader from '@/components/loader/loader'
import taskBlock from '@/components/tasks/task-block/task-block'
import taskEditModal from '@/components/tasks/task-edit-modal/task-edit-modal'
import innerLoader from '@/components/inner-loader/inner-loader'

export default {
  name: 'task-view-page',

  components: {
    priorityMark,
    loader,
    innerLoader,
    taskBlock,
    taskEditModal
  },

  data () {
    return {
      isLoading: false,
      isUpdating: false,
      task: taskProfileModel,
      errorMessage: '',
      routeItems: [],
      taskEdit: taskProfileModel
    }
  },

  watch: {
    '$route': 'loadTaskById'
  },

  created () {
    this.loadTaskById()
    this.routeItems = [{ text: 'Task list', to: { name: 'task-view' } }, { text: 'Task', active: true }]
  },

  methods: {
    loadTaskById () {
      this.isLoading = true

      getTaskById(+this.$route.params.id).then(task => {
        this.task = task

        return this.task
      })
      .then((task) => {
        if (!task.assignee) {
          task.assignee = { ...taskProfileModel.assignee }
          return
        }

        if (task.assignee.isFetched) {
          return
        }

        return getProfileById(this.task.assignee).then((user) => {
          this.task.assignee = { ...user, isFetched: true }
        })
      })
      .then(() => {
        this.taskEdit = { ...this.task }
      })
      .catch(err => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isLoading = false
      })
    },

    onModalApply () {
      this.isUpdating = true

      updateTaskById(this.taskEdit.id, this.taskEdit).then(() => {
        this.task = { ...this.taskEdit }
      })
      .catch(err => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isUpdating = false
      })
    },

    onModalClose () {
      this.taskEdit = { ...this.task }
    }
  },

  computed: {
    fullName () {
      return `${this.task.assignee.name.first || ''} ${this.task.assignee.name.last || ''}`
    }
  }
}
</script>

<style lang="scss">
.task-leftside {
  border-right: 1px dashed $main-gray;
}

.options-panel {
  display: flex;
  flex-basis: 100%;
  margin-bottom: 15px;
}

.task-content {
  position: relative;
  background-color: $black-5;
  padding: 15px 0;

  .task-name {
    display: inline-block;
    font-size: 21px;
    line-height: 1.8;
    color: $main-green;
    border-bottom: 1px solid #7db025;
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



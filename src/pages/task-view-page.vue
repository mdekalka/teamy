<template>
<content-layout class="task-view-page" :load-screen="isLoading">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="options-panel">
            <b-button v-b-modal.task-edit-modal :disabled="isTaskFailed">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <task-preview v-if="!isTaskFailed" :task="task" />
    </b-container>
    <message-panel :show="isTaskFailed" :message="getLoadFailedMessage" :type="'danger'" />
    <task-edit-modal :on-cancel="onModalClose" :on-apply="onModalApply" :task="taskEdit" />
  </content-layout>
</template>

<script>
import { getTaskById, updateTaskById } from '@/components/tasks/tasks-api'
import taskProfileModel from '@/components/tasks/tasks-model'
import { task } from '@/config/messages'

import contentLayout from '@/components/common/content-layout'
import taskPreview from '@/components/tasks/task-preview/task-preview'
import taskEditModal from '@/components/tasks/task-edit-modal/task-edit-modal'
import messagePanel from '@/components/common/message-panel'

export default {
  name: 'task-view-page',

  components: {
    contentLayout,
    taskPreview,
    taskEditModal,
    messagePanel
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
  },

  methods: {
    loadTaskById () {
      this.isLoading = true

      getTaskById(this.$route.params.id).then(task => {
        this.task = task
        this.taskEdit = { ...this.task }
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(() => {
        this.isLoading = false
      })
    },

    onModalApply () {
      this.isUpdating = true

      updateTaskById(this.taskEdit.id, this.taskEdit).then(updatedTask => {
        this.task = { ...updatedTask }
      })
      .catch(({ message }) => {
        this.errorMessage = message
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
    isTaskFailed () {
      return !this.isLoading && !!this.errorMessage
    },

    getLoadFailedMessage () {
      return task.FETCH_TASK_FAILED.text
    }
  }
}
</script>

<style lang="scss">
.options-panel {
  display: flex;
  flex-basis: 100%;
  margin-bottom: 15px;
}
</style>

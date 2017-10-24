<template>
  <content-layout class="task-list-page" :load-screen="isLoading">
    <b-container fluid class="task-list">
      <b-row>
        <b-col>
          <header-title :title="'User stories:'" underline/>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
           <ul>
            <draggable v-model="tasks" :options="options">
              <task-item v-for="task in tasks" :key="task.id" :task="task" />
            </draggable>
           </ul>
        </b-col>
      </b-row>
    </b-container>
  </content-layout>
</template>

<script>
import draggable from 'vuedraggable'

import contentLayout from '@/components/common/content-layout'
import headerTitle from '@/components/common/header-title'
import loader from '@/components/common/loader'
import innerLoader from '@/components/common/inner-loader'
import priorityMark from '@/components/common/priority-mark'
import typeMark from '@/components/common/type-mark'
import taskItem from '@/components/tasks/task-item/task-item'
import itemRow from '@/components/common/item-row'

import { getTasks } from '@/components/tasks/tasks-api'

export default {
  name: 'task-list-page',

  components: {
    draggable,
    contentLayout,
    headerTitle,
    priorityMark,
    typeMark,
    loader,
    innerLoader,
    taskItem,
    itemRow
  },

  data () {
    return {
      options: {
        animation: 100
      },
      tasks: [],
      isLoading: false,
      errorMessage: ''
    }
  },

  created () {
    this.loadTasks()
  },

  methods: {
    loadTasks () {
      this.isLoading = true

      getTasks().then(tasks => {
        this.tasks = tasks
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  }
}
</script>

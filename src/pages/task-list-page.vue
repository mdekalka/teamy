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
              <task-item v-for="task in tasks" :key="task.id" :task="task" :active-id="activeId" @on-item-click="onItemClick" />
            </draggable>
           </ul>
        </b-col>
        <b-col col md="4" v-if="currentTask">
          <div class="task-preview" >
            <button @click="onItemClose()" class="btn-icon"><i class="fa fa-times" aria-hidden="true"></i></button>
            <ul>
              <li>
                <item-row offset="100" title="Name:">{{currentTask.name}}</item-row>
              </li>
              <li>
                <item-row offset="100" title="Description:">{{currentTask.description}}</item-row>
              </li>
              <li>
                <item-row offset="100" title="Priority:"><priority-mark :color="currentTask.priority" />{{currentTask.priority}}</item-row>
              </li>
              <li>
                <item-row offset="100" title="Type:"><type-mark :type="currentTask.type" />{{currentTask.type}}</item-row>
              </li>
            </ul>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </content-layout>
</template>

<script>
import draggable from 'vuedraggable'

import contentLayout from '@/components/common/content-layout'
import headerTitle from '@/components/common/header-title'
import loader from '@/components/loader/loader'
import innerLoader from '@/components/inner-loader/inner-loader'
import priorityMark from '@/components/priority-mark/priority-mark'
import typeMark from '@/components/type-mark/type-mark'
import taskItem from '@/components/tasks/task-item/task-item'
import itemRow from '@/components/common/item-row'

import { getTasks } from '@/components/tasks/tasks-api'
import { getProfileById } from '@/components/profile/profile-api'

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
      currentTask: null,
      isLoading: false,
      errorMessage: '',
      sortingOptions: {
        sortType: '',
        sortReverse: false
      }
    }
  },

  created () {
    this.loadTasks()
  },

  methods: {
    onItemClick (id) {
      this.currentTask = this.tasks.find(task => task.id === id)
    },

    onItemClose () {
      this.currentTask = null
    },

    loadTasks () {
      this.isLoading = true

      getTasks().then(tasks => {
        this.tasks = tasks

        const allAssignees = this.tasks.map((task) => {
          if (task.assignee) {
            return getProfileById(task.assignee)
          }
        })

        return Promise.all(allAssignees)
      })
      .then(assignees => {
        this.tasks.forEach((task, index) => {
          task.assignee = assignees ? { ...assignees[index] } : {}
        })
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  },

  computed: {
    activeId () {
      return this.currentTask && this.currentTask.id
    }
  }
}
</script>

<style lang="scss">
.task-preview {
  position: relative;
  padding: 8px 20px;
  font-size: 15px;
  background-color: $black-1;

  .btn-icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .item-row {
    word-break: break-word;
    margin-bottom: 10px;

    .type-mark,
    .priority-mark {
      margin-right: 10px;
    }
  }

  .item-row-title {
    float: left;
    width: 110px;
    margin-right: 10px;
  }

  .item-row-text {
    overflow: hidden;
  }
}
</style>



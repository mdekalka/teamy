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
          <ul id="task-list">
            <task-item v-for="task in tasks" :key="task.id" id="'task-list'" :task="task" :active-id="activeId" @on-item-click="onItemClick" />
          </ul>
        </b-col>
        <b-col col md="4" v-if="currentTask">
          <div class="task-preview" >
            <button @click="onItemClose()" class="btn-icon"><i class="fa fa-times" aria-hidden="true"></i></button>
            <ul>
              <li>
                <div class="task-item-row">
                  <div class="task-preview-title" title="Name">Name:</div>
                  <div class="task-preview-text">{{currentTask.name}}</div>
                </div>
              </li>
              <li>
                <div class="task-item-row">
                  <div class="task-preview-title" title="Description">Description:</div>
                  <div class="task-preview-text">{{currentTask.description}}</div>
                </div>
              </li>
              <li>
                <div class="task-item-row">
                  <div class="task-preview-title" title="Priority">Priority:</div>
                  <div class="task-preview-text"><priority-mark :color="currentTask.priority" />{{currentTask.priority}}</div>
                </div>
              </li>
              <li>
                <div class="task-item-row">
                  <div class="task-preview-title" title="Type">Type:</div>
                  <div class="task-preview-text"><type-mark :type="currentTask.type" />{{currentTask.type}}</div>
                </div>
              </li>
            </ul>
          </div>
        </b-col>

        <inner-loader v-if="isSorting" />
      </b-row>
    </b-container>
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'
import headerTitle from '@/components/common/header-title'
import loader from '@/components/loader/loader'
import innerLoader from '@/components/inner-loader/inner-loader'
import priorityMark from '@/components/priority-mark/priority-mark'
import typeMark from '@/components/type-mark/type-mark'
import taskItem from '@/components/tasks/task-item/task-item'

import { getTasks } from '@/components/tasks/tasks-api'

export default {
  name: 'task-page',

  components: {
    contentLayout,
    headerTitle,
    priorityMark,
    typeMark,
    loader,
    innerLoader,
    taskItem
  },

  data () {
    return {
      tasks: [],
      currentTask: null,
      isLoading: false,
      isSorting: false,
      errorMessage: '',
      sortingOptions: {
        sortType: '',
        sortReverse: false
      }
    }
  },

  created () {
    this.getTasks()
  },

  methods: {
    onItemClick (id) {
      this.currentTask = this.tasks.find(task => task.id === id)
    },

    onItemClose () {
      this.currentTask = null
    },

    getTasks () {
      this.isLoading = true

      return getTasks().then(tasks => {
        this.tasks = tasks
        this.currentTask = this.tasks[0]

        // const allAssignees = this.tasks.map((task) => {
        //   if (!task.assignee) {
        //     return { ...taskProfileModel.assignee }
        //   } else {
        //     if (task.assignee.isFetched) {
        //       return task.assignee
        //     } else {
        //       return getUserById(task.assignee)
        //     }
        //   }
        // })

        // return Promise.all(allAssignees)
      })
      .then(assignees => {
        // this.tasks.forEach((task, index) => {
        //   task.assignee = { ...assignees[index], isFetched: true }
        // })
      })
      .catch(({ message }) => {
        this.errorMessage = message
      })
      .finally(_ => {
        this.isLoading = false
      })
    }

    // getFilteredTasks ({ sortType, sortReverse }) {
    //   this.isSorting = true

    //   return getFilteredTasks(sortType, sortReverse).then((tasks) => {
    //     this.tasks = tasks
    //   })
    //   .catch(err => {
    //     this.errorMessage = err
    //   })
    //   .finally(() => {
    //     this.isSorting = false
    //   })
    // },

    // onHeaderClick (header) {
    //   if (header.sort) {
    //     if (!this.sortingOptions.sortType || this.sortingOptions.sortType !== header.key) {
    //       this.sortingOptions.sortType = header.key
    //       this.sortingOptions.sortReverse = false

    //       this.getFilteredTasks(this.sortingOptions)
    //       return
    //     }

    //     this.sortingOptions.sortReverse = !this.sortingOptions.sortReverse
    //     this.getFilteredTasks(this.sortingOptions)
    //   }
    // },

    // getFullName ({ first = '', last = '' }) {
    //   if (!first.length && !last.length) {
    //     return NO_VALUE
    //   }

    //   return `${first} ${last}`
    // }
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

  .task-item-row {
    word-break: break-word;
    margin-bottom: 10px;

    .type-mark,
    .priority-mark {
      margin-right: 10px;
    }
  }

  .task-preview-title {
    float: left;
    width: 110px;
    margin-right: 10px;
  }

  .task-preview-text {
    overflow: hidden;
  }
}
</style>



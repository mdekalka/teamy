<template>
  <div class="task-page page">
    <div class="task-list" v-if="!isLoading">
      <table class="task-table bordered">
        <thead>
          <th 
            v-for="(head, index) in headers"
            @click="onHeaderClick(head)"
            :key="index"
            :class="{'active': head.key === sortingOptions.sortType}">
            {{head.name}}
            <i v-if="head.sort" class="fa" :class="[sortingOptions.sortReverse ? 'fa-caret-up' : 'fa-caret-down']" aria-hidden="true"></i>
          </th>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td class="text-center">{{task.id}}</td>
            <td><router-link :to="{ name: 'task', params: { id: task.id }}">{{task.name}}</router-link></td>
            <td>{{task.description}}</td>
            <td class="text-center" v-b-tooltip.left :title="task.priority"><priority-mark :color="task.priority" /></td>
            <td class="text-center" v-b-tooltip.left :title="task.type"><type-mark :type="task.type" /></td>
            <td>{{task.status}}</td>
            <td>{{task.assignee}}</td>
          </tr>
        </tbody>
      </table>
      <inner-loader v-if="isSorting" />
    </div>
    <loader v-else />
    <div class="task-preview">

    </div>
  </div>
</template>

<script>
import loader from '@/components/loader/loader'
import innerLoader from '@/components/inner-loader/inner-loader'
import priorityMark from '@/components/priority-mark/priority-mark'
import typeMark from '@/components/type-mark/type-mark'

import { getTasks, getFilteredTasks } from '../task-page-api'

const headers = [
  { id: 1, key: 'id', name: 'Id' },
  { id: 2, key: 'name', name: 'Name', sort: true },
  { id: 3, key: 'description', name: 'Description', sort: true },
  { id: 4, key: 'priority', name: 'Priority', sort: true },
  { id: 5, key: 'type', name: 'Type', sort: true },
  { id: 6, key: 'status', name: 'Status', sort: true },
  { id: 7, key: 'assignee', name: 'Assignee' }
]

export default {
  name: 'task-page',

  components: {
    priorityMark,
    typeMark,
    loader,
    innerLoader
  },

  data () {
    return {
      tasks: [],
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

    this.headers = headers
  },

  methods: {
    getTasks () {
      this.isLoading = true

      return getTasks().then((tasks) => {
        this.tasks = tasks
      })
      .catch(err => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isLoading = false
      })
    },

    getFilteredTasks ({ sortType, sortReverse }) {
      this.isSorting = true

      return getFilteredTasks(sortType, sortReverse).then((tasks) => {
        this.tasks = tasks
      })
      .catch(err => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isSorting = false
      })
    },

    onHeaderClick (header) {
      if (header.sort) {
        if (!this.sortingOptions.sortType || this.sortingOptions.sortType !== header.key) {
          this.sortingOptions.sortType = header.key
          this.sortingOptions.sortReverse = false

          this.getFilteredTasks(this.sortingOptions)
          return
        }

        this.sortingOptions.sortReverse = !this.sortingOptions.sortReverse
        this.getFilteredTasks(this.sortingOptions)
      }
    }
  }
}
</script>

<style lang="scss">
.task-list {
  position: relative;
}

.task-table {
  th {
    cursor: pointer;

    i {
      visibility: hidden;
    }

    &.active {
      i {
        color: $main-green;
        visibility: visible;
      }
    }

    &:hover {
      i {
        visibility: visible;
      }
    }
  }
}
</style>



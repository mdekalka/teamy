<template>
  <div class="task-profile page">
    <b-container fluid>
      <b-row>
        <b-col>
          <b-breadcrumb :items="routeItems"/>
        </b-col>
      </b-row>
      <b-row class="task-content" v-if="!isLoading && !errorMessage">
        <b-col class="task-leftside" md="8">
          <h2 class="task-name">{{task.name}}</h2>
          <div class="task-block">
            <span class="task-row-name">Priority:</span>
            <span class="task-row-description">{{task.priority}}<priority-mark :color="task.priority" /></span>
          </div>

          <div class="task-block">
            <span class="task-row-name">Type:</span>
            <span class="task-row-description">{{task.type}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Status:</span>
            <span class="task-row-description">{{task.status}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Sprint:</span>
            <span class="task-row-description">{{task.sprint}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Labels:</span>
            <span class="task-row-description">{{task.labels.join(', ')}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Environment:</span>
            <span class="task-row-description">{{task.environment}}</span>
          </div>
          <div class="task-block">
            <div class="task-label">Description:</div>
            {{task.description}}
          </div>

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
          <div class="task-block">
            <span class="task-row-name">Votes:</span>
            <span class="task-row-description">{{task.votes}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Reporter:</span>
            <span class="task-row-description">{{task.reporter}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Assignee:</span>
            <span class="task-row-description">
              <img class="task-assignee" :src="task.assignee.picture.thumbnail" />
              {{fullName}}
              </span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Created date:</span>
            <span class="task-row-description">{{task.dates.created}}</span>
          </div>
          <div class="task-block">
            <span class="task-row-name">Updated date:</span>
            <span class="task-row-description">{{task.dates.updated}}</span>
          </div>
          <hr>
          <div class="task-block block">
            <span class="task-row-name">Estimated time ({{task.time.estimated}} hr):</span>
            <span class="task-row-description">
              <b-progress height="16px" :value="task.time.estimated" :max="task.time.estimated" variant="dark"></b-progress>
            </span>
          </div>
          <div class="task-block block">
            <span class="task-row-name">Logged time ({{task.time.logged}} hr):</span>
            <span class="task-row-description">
              <b-progress height="16px" :value="task.time.logged" :max="task.time.estimated" variant="dark"></b-progress>
            </span>
          </div>
        </b-col>
      </b-row>
      <loader v-else />
    </b-container>
  </div>
</template>

<script>
import { getTaskById } from '../task-page-api'
import { getUserById } from '@/components/users/user-list-api'
import priorityMark from '@/components/priority-mark/priority-mark'
import loader from '@/components/loader/loader'

export default {
  name: 'task-profile',

  components: {
    priorityMark,
    loader
  },

  data () {
    return {
      isLoading: false,
      task: {},
      errorMessage: '',
      routeItems: []
    }
  },

  created () {
    console.log(this.$route)
    this.loadTaskById(this.$route.params.id)
    this.routeItems = [{ text: 'Task list', to: { name: 'taskPage' } }, { text: 'Task', active: true }]
  },

  methods: {
    loadTaskById (id) {
      this.isLoading = true

      getTaskById(+id).then(task => {
        this.task = task
      })
      .then(() => {
        return getUserById(this.task.assignee).then((user) => {
          this.task.assignee = user
        })
      })
      .catch(err => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isLoading = false
      })
    }
  },

  computed: {
    fullName () {
      return `${this.task.assignee.name.first} ${this.task.assignee.name.last}`
    }
  }
}
</script>

<style lang="scss">
.task-leftside {
  border-right: 1px dashed $main-gray;
}

.task-content {
  background-color: $black-5;
  padding: 15px 0;

  .task-block {
    margin-bottom: 8px;

    &.block {
      .task-row-name,
      .task-row-description {
        display: block;
      }
    }
  }

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

  .task-row-name,
  .task-row-description {
    display: inline-block;
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

.task-description {
  // padding-top: 15px;
  // padding-bottom: 15px;
  
}

</style>



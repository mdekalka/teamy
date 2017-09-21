<template>
  <div v-if="!isLoading" class="user-list">
    <b-container fluid>
      <b-row>
        <b-col>
          <div class="options-panel">
            <div class="btn-group">
              <b-button class="toggle-panel" @click="onTogglePanelClick"><i class="fa fa-filter" aria-hidden="true"></i></b-button>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col col md="4" v-for="user in users" :key="user.id">
          <user-card  :user="user" />
        </b-col>
      </b-row>
    </b-container>
    <!-- with options -->
    <side-panel :is-open="isPanelOpen">
      piupipu
    </side-panel>
  </div>
  <loader v-else />
  
</template>

<script>
import userCard from '@/components/users/user-card/user-card'
import sidePanel from '@/components/side-panel/side-panel'
import loader from '@/components/loader/loader'

import { getUsers } from '../user-list-api'
import { extendWithColors } from './user-list-service'

export default {
  name: 'user-list',

  components: {
    userCard,
    sidePanel,
    loader
  },

  data () {
    return {
      users: [],
      isLoading: false,
      errorMessage: '',
      isPanelOpen: false
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    getUsers () {
      this.isLoading = true

      getUsers().then(users => {
        this.users = users.map(user => {
          return { ...user, skills: extendWithColors(user.skills) }
        })
      })
      .catch((err) => {
        this.errorMessage = err
      })
      .finally(() => {
        this.isLoading = false
      })
    },
    onTogglePanelClick () {
      this.isPanelOpen = true
    }
  }
}
</script>

<style lang="scss">
.user-list {
  flex: 0 1 100%;

  .options-panel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}


</style>



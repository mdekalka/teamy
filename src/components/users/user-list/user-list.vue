<template>
  <div class="user-list">
    <h4>User list</h4>
    <user-card v-for="user in users" :user="user" :key="user.id" />
  </div>
</template>

<script>
import userCard from '@/components/users/user-card/user-card'

import { getUsers } from './user-list-api'
import { extendWithColors } from './user-list-service'

export default {
  name: 'user-list',

  components: {
    userCard
  },

  data () {
    return {
      users: [],
      isLoading: false,
      errorMessage: ''
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    getUsers () {
      getUsers().then(users => {
        this.users = users.map(user => {
          return { ...user, skills: extendWithColors(user.skills) }
        })
      })
    }
  }
}
</script>

<style lang="scss">

</style>



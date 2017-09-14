<template>
  <div class="user-list">
    <h4>User list</h4>
    {{users}}
    <user-card v-for="user in users" :key="user.id" />
  </div>
</template>

<script>
import userCard from '@/components/users/user-card/user-card'
import { getUsers } from './user-list-api'

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
        this.users = users
      })
    }
  }
}
</script>

<style lang="scss">

</style>



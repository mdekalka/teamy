import Vue from 'vue'
import Router from 'vue-router'
import userList from '@/components/users/user-list/user-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userList',
      component: userList
    }
  ]
})

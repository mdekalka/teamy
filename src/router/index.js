import Vue from 'vue'
import Router from 'vue-router'
import userList from '@/components/users/user-list/user-list'
import taskPage from '@/components/tasks/task-page/task-page'
import taskProfile from '@/components/tasks/task-profile/task-profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userList',
      component: userList
    },
    {
      path: '/tasks',
      name: 'taskPage',
      component: taskPage
    },
    {
      path: '/task/:id',
      name: 'task',
      component: taskProfile
    }
  ]
})

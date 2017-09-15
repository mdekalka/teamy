import Vue from 'vue'
import Router from 'vue-router'
import userList from '@/components/users/user-list/user-list'
import taskPage from '@/components/tasks/task-page/task-page'

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
    }
  ]
})

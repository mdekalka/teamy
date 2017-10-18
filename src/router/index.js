import Vue from 'vue'
import Router from 'vue-router'

import taskProfile from '@/components/tasks/task-profile/task-profile'
import createProfilePage from '@/pages/create-profile-page'
import editProfilePage from '@/pages/edit-profile-page'
import profileListPage from '@/pages/profile-list-page'
import taskListPage from '@/pages/task-list-page'
import profileViewPage from '@/pages/profile-view-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/new-profile',
      name: 'new-profile',
      component: createProfilePage
    },
    {
      path: '/profiles',
      name: 'profile-list',
      component: profileListPage
    },
    {
      path: '/edit-profile/:id',
      name: 'edit-profile',
      component: editProfilePage
    },
    {
      path: '/tasks',
      name: 'task-list',
      component: taskListPage
    },
    {
      path: '/task/:id',
      name: 'task',
      component: taskProfile
    },
    {
      path: '/profile/:id',
      name: 'profile-view',
      component: profileViewPage
    }
  ]
})

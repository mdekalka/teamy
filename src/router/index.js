import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@/pages/home-page'
import createProfilePage from '@/pages/create-profile-page'
import editProfilePage from '@/pages/edit-profile-page'
import profileListPage from '@/pages/profile-list-page'
import profileViewPage from '@/pages/profile-view-page'
import taskListPage from '@/pages/task-list-page'
import taskViewPage from '@/pages/task-view-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
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
      path: '/profile/:id',
      name: 'profile-view',
      component: profileViewPage
    },
    {
      path: '/tasks',
      name: 'task-list',
      component: taskListPage
    },
    {
      path: '/task/:id',
      name: 'task-view',
      component: taskViewPage
    }
  ]
})

import axios from 'axios'

import { getTaskById } from '@/components/tasks/tasks-api'

export const getProfileById = (id) => {
  return axios.get(`/profiles/${id}`).then(({ data }) => data)
}

export const getProfiles = () => {
  let profiles = null

  return axios.get('/profiles').then(({ data }) => {
    let allTasks = []
    profiles = data

    data.forEach(profile => {
      const tasks = profile.tasks.map(id => {
        return getTaskById(id)
      })

      allTasks = allTasks.concat(tasks)
    })

    return Promise.all(allTasks)
  })
  .then(tasks => {
    const tasksKeys = tasks.reduce((init, current) => {
      init[current.id] = current
      return init
    }, {})

    profiles.forEach((profile, index) => {
      const actualTasks = []

      profile.tasks.forEach(task => {
        if (tasksKeys[task]) {
          actualTasks.push(tasksKeys[task])
        }
      })

      profile.tasks = actualTasks
    })

    return profiles
  })
}

export const addProfile = (profile) => {
  return axios.post('/profiles', profile).then(({ data }) => data)
}

export const updateProfileById = (id, data) => {
  return axios.patch(`/profiles/${id}`, { data }).then(({ data }) => data)
}

export const removeProfileById = (id) => {
  return axios.delete(`/profiles/${id}`).then(({ data }) => data)
}

export default {
  getProfileById,
  getProfiles,
  addProfile,
  updateProfileById,
  removeProfileById
}

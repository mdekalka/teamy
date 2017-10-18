import { wait } from '@/config/api'
import profileList from '@/mocks/userList'

let profiles = profileList
const promiseTimeout = 2000

export const getProfileById = (id) => {
  return wait(0).then(_ => {
    const profile = profiles.find((profile) => profile.id === id)

    if (profile) {
      return profile
    } else {
      throw new Error('User was not found')
    }
  })
}

export const getProfiles = () => {
  return wait(promiseTimeout).then(_ => {
    return profiles
  })
}

export const addProfile = (profile) => {
  return wait(promiseTimeout).then(() => {
    profiles.push(profile)

    return profiles
  })
}

export const updateProfileById = (id, data) => {
  return wait(promiseTimeout).then(_ => {
    const currentUser = profiles.find(profile => profile.id === id)

    if (currentUser) {
      return { ...currentUser, data }
    } else {
      throw new Error('User was not found')
    }
  })
}

export const removeProfileById = (id) => {
  return wait(promiseTimeout).then(_ => {
    profiles = profiles.filter(profile => profile.id !== id)

    return id
  })
}

export default {
  getProfiles,
  getProfileById,
  addProfile,
  updateProfileById
}

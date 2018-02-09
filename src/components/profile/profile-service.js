import { getFullName } from './profile-model'

const colorMapping = {
  1: '#2980b9',
  2: '#8e44ad',
  3: '#27ae60',
  4: '#f1c40f',
  5: '#e74c3c',
  6: '#1abc9c'
}

export const extendWithColors = (list) => {
  return list.map(item => {
    if (colorMapping[item.key]) {
      return { ...item, color: colorMapping[item.key] }
    } else {
      return item
    }
  })
}

const isFilteredByCount = (profile, filters) => {
  return profile.tasks.length < filters.filterTaskCount
}

const isFilteredByRoles = (profile, filters) => {
  if (Object.keys(filters.filterRoles).length) {
    return !profile.roles.some(role => filters.filterRoles[role.key])
  }
}

const isFilteredByName = (profile, filters) => {
  const regExp = new RegExp(filters.filterQuery, 'i')

  return regExp.test(getFullName(profile.name))
}

export const filterProfiles = (profiles, filters) => {
  return profiles.filter(profile => {
    if (isFilteredByCount(profile, filters)) {
      return false
    }

    if (isFilteredByRoles(profile, filters)) {
      return false
    }

    return isFilteredByName(profile, filters)
  })
}

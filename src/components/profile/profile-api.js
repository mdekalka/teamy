import axios from 'axios'

export const getProfileById = (id) => {
  return axios.get(`/profiles/${id}`).then(({ data }) => data)
}

export const getProfiles = () => {
  return axios.get('/profiles').then(({ data }) => data)
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

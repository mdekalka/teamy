import axios from 'axios'

import {
  LOAD_PROFILES_INIT,
  LOAD_PROFILES_SUCCESS,
  LOAD_PROFILES_FAIL,
  REMOVE_PROFILE_INIT,
  REMOVE_PROFILE_SUCCESS,
  REMOVE_PROFILE_FAIL,
  LOAD_PROFILE_INIT,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  ADD_PROFILE_INIT,
  ADD_PROFILE_SUCCESS,
  ADD_PROFILE_FAIL,
  UPDATE_PROFILE_INIT,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL
} from './types'

// Profile API actions
export const profileActions = {
  getProfiles ({ commit }) {
    commit(LOAD_PROFILES_INIT)

    return axios.get('/profiles').then((response) => {
      return commit(LOAD_PROFILES_SUCCESS, response.data)
    })
    .catch(err => {
      commit(LOAD_PROFILES_FAIL, err.message)
    })
  },

  removeProfileById ({ commit }, payload) {
    commit(REMOVE_PROFILE_INIT)

    return axios.delete(`/profiles/${payload}`).then(_ => {
      return commit(REMOVE_PROFILE_SUCCESS, payload)
    })
    .catch(err => {
      commit(REMOVE_PROFILE_FAIL, err.message)
    })
  },

  getProfileById ({ commit }, payload) {
    commit(LOAD_PROFILE_INIT)

    return axios.get(`/profiles/${payload}`).then(response => {
      return commit(LOAD_PROFILE_SUCCESS, response.data)
    })
    .catch(err => {
      commit(LOAD_PROFILE_FAIL, err.message)
    })
  },

  addProfile ({ commit }, payload) {
    commit(ADD_PROFILE_INIT)

    return axios.post('/profiles', payload).then(response => {
      return commit(ADD_PROFILE_SUCCESS, response.data)
    })
    .catch(err => {
      commit(ADD_PROFILE_FAIL, err.message)
    })
  },

  updateProfileById ({ commit }, payload) {
    commit(UPDATE_PROFILE_INIT)

    return axios.patch(`/profiles/${payload.id}`, payload.data).then(response => {
      return commit(UPDATE_PROFILE_SUCCESS, response.data)
    })
    .catch(err => {
      commit(UPDATE_PROFILE_FAIL, err.message)
    })
  }
}

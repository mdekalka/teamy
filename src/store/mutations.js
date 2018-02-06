import { extendWithColors } from '../components/profile/profile-service'
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

export const profileMutations = {
  [LOAD_PROFILES_INIT] ({ profileState }) {
    profileState.isLoading = true
  },

  [LOAD_PROFILES_SUCCESS] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = ''
    profileState.profiles = payload.map(profile => {
      return { ...profile, roles: extendWithColors(profile.roles) }
    })
  },

  [LOAD_PROFILES_FAIL] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = payload
  },

  [REMOVE_PROFILE_INIT] ({ profileState }) {
    profileState.isLoading = true
  },

  [REMOVE_PROFILE_SUCCESS] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = ''
    profileState.profiles = profileState.profiles.filter(profile => profile.id !== payload)
  },

  [REMOVE_PROFILE_FAIL] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = payload
  },

  [LOAD_PROFILE_INIT] ({ profileState }) {
    profileState.isLoading = true
  },

  [LOAD_PROFILE_SUCCESS] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = ''
    profileState.profile = payload
  },

  [LOAD_PROFILE_FAIL] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = payload
  },

  [ADD_PROFILE_INIT] ({ profileState }, payload) {
    profileState.isLoading = true
  },

  [ADD_PROFILE_SUCCESS] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = ''
    profileState.createdId = payload.id
  },

  [ADD_PROFILE_FAIL] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = payload
  },

  [UPDATE_PROFILE_INIT] ({ profileState }) {
    profileState.isLoading = true
  },

  [UPDATE_PROFILE_SUCCESS] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = ''
    profileState.profile = payload
  },

  [UPDATE_PROFILE_FAIL] ({ profileState }, payload) {
    profileState.isLoading = false
    profileState.errorMessage = payload
  }
}

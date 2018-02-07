import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { profileMutations } from '../../../src/store/mutations'
import { profileActions } from '../../../src/store/actions'
import { profileState } from '../../../src/store/initialState'
import { profileGetters } from '../../../src/store/getters'
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
} from '../../../src/store/types'
import { mockProfiles, mockErrorMessage } from '../../../__mocks__/mocks'

const localVue = createLocalVue()

localVue.use(Vuex)

// Mock profile service methods
jest.mock('../../../src/components/profile/profile-service', () => {
  return { extendWithColors: jest.fn(arg => arg) }
})

describe('testing store profile actions', () => {
  let store
  let state

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        profileState: { ...profileState }
      },
      mutations: profileMutations,
      actions: profileActions,
      getters: profileGetters
    })

    state = store.getters.profileInfo
  })

  afterAll(() => {
    jest.unmock('../../../src/components/profile/profile-service')
  })

  // LOAD PROFILES
  test('load profiles init', () => {
    expect(state.isLoading).toBe(false)

    profileMutations[LOAD_PROFILES_INIT](store.state)

    expect(state.isLoading).toBe(true)
  })

  test('load profiles success', () => {
    const expectedProfiles = mockProfiles.map(profile => {
      return { ...profile, roles: profile.roles }
    })

    profileMutations[LOAD_PROFILES_SUCCESS](store.state, mockProfiles)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe('')
    expect(state.profiles).toEqual(expectedProfiles)
  })

  test('load profiles fail', () => {
    profileMutations[LOAD_PROFILES_FAIL](store.state, mockErrorMessage)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe(mockErrorMessage)
  })

  // REMOVE PROFILE
  test('remove profile init', () => {
    expect(state.isLoading).toBe(false)

    profileMutations[REMOVE_PROFILE_INIT](store.state)

    expect(state.isLoading).toBe(true)
  })

  test('remove profile success', () => {
    const removedProfileId = mockProfiles[0].id
    const expectedProfiles = mockProfiles.filter(profile => profile.id !== removedProfileId)

    // Load mock profiles
    profileMutations[LOAD_PROFILES_SUCCESS](store.state, mockProfiles)
    // Remove profile by id
    profileMutations[REMOVE_PROFILE_SUCCESS](store.state, removedProfileId)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe('')
    expect(state.profiles).toEqual(expectedProfiles)
  })

  test('remove profile fail', () => {
    profileMutations[REMOVE_PROFILE_FAIL](store.state, mockErrorMessage)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe(mockErrorMessage)
  })

  // LOAD PROFILE
  test('load profile init', () => {
    expect(state.isLoading).toBe(false)

    profileMutations[LOAD_PROFILE_INIT](store.state)

    expect(state.isLoading).toBe(true)
  })

  test('load profile success', () => {
    const expectedProfile = mockProfiles[0]

    profileMutations[LOAD_PROFILE_SUCCESS](store.state, mockProfiles[0])

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe('')
    expect(state.profile).toEqual(expectedProfile)
  })

  test('load profile fail', () => {
    profileMutations[LOAD_PROFILE_FAIL](store.state, mockErrorMessage)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe(mockErrorMessage)
  })

  // ADD PROFILE
  test('add profile init', () => {
    expect(state.isLoading).toBe(false)

    profileMutations[ADD_PROFILE_INIT](store.state)

    expect(state.isLoading).toBe(true)
  })

  test('add profile success', () => {
    const addedProfileId = { id: mockProfiles[0].id }

    profileMutations[ADD_PROFILE_SUCCESS](store.state, addedProfileId)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe('')
    expect(state.createdId).toEqual(addedProfileId.id)
  })

  test('add profile fail', () => {
    profileMutations[ADD_PROFILE_FAIL](store.state, mockErrorMessage)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe(mockErrorMessage)
  })

  // UPDATE PROFILE
  test('update profile init', () => {
    expect(state.isLoading).toBe(false)

    profileMutations[UPDATE_PROFILE_INIT](store.state)

    expect(state.isLoading).toBe(true)
  })

  test('update profile success', () => {
    const existingProfile = mockProfiles[0]
    const updatedProfile = { ...existingProfile, title: 'My super title', name: { first: 'First name', last: 'Last name' } }

    profileMutations[LOAD_PROFILE_SUCCESS](store.state, existingProfile[0])
    profileMutations[UPDATE_PROFILE_SUCCESS](store.state, updatedProfile)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe('')
    expect(state.profile).toEqual(updatedProfile)
  })

  test('update profile fail', () => {
    profileMutations[UPDATE_PROFILE_FAIL](store.state, mockErrorMessage)

    expect(state.isLoading).toBe(false)
    expect(state.errorMessage).toBe(mockErrorMessage)
  })
})

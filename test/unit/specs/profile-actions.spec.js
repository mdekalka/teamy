import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

// import { profileMutations } from '../../../src/store/mutations'
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
import { mockRequest } from '../../../__mocks__/mocks'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('testing store profile actions', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        profileState: { ...profileState }
      },
      actions: profileActions,
      getters: profileGetters
    })
  })

  test('should call [LOAD_PROFILES_INIT, LOAD_PROFILES_SUCCESS] on sucess request', () => {
    const loadProfilesInit = jest.fn()
    const loadProfilesSuccess = jest.fn()
    const loadProfilesFail = jest.fn()

    store.hotUpdate({
      mutations: {
        [LOAD_PROFILES_INIT]: loadProfilesInit,
        [LOAD_PROFILES_SUCCESS]: loadProfilesSuccess,
        [LOAD_PROFILES_FAIL]: loadProfilesFail
      }
    })

    return store.dispatch('getProfiles').then(_ => {
      expect(loadProfilesInit).toHaveBeenCalled()
      expect(loadProfilesSuccess).toHaveBeenCalledWith(store.state, mockRequest.data)
      expect(loadProfilesFail).not.toHaveBeenCalled()
    })
  })

  test('should call [REMOVE_PROFILE_INIT, REMOVE_PROFILE_SUCCESS] on sucess request', () => {
    const removeProfileInit = jest.fn()
    const removeProfileSuccess = jest.fn()
    const removeProfileFail = jest.fn()
    const id = 1

    store.hotUpdate({
      mutations: {
        [REMOVE_PROFILE_INIT]: removeProfileInit,
        [REMOVE_PROFILE_SUCCESS]: removeProfileSuccess,
        [REMOVE_PROFILE_FAIL]: removeProfileFail
      }
    })

    return store.dispatch('removeProfileById', id).then(_ => {
      expect(removeProfileInit).toHaveBeenCalled()
      expect(removeProfileSuccess).toHaveBeenCalledWith(store.state, id)
      expect(removeProfileFail).not.toHaveBeenCalled()
    })
  })

  test('should call [LOAD_PROFILE_INIT, LOAD_PROFILE_SUCCESS] on sucess request', () => {
    const loadProfileInit = jest.fn()
    const loadProfileSuccess = jest.fn()
    const loadProfileFail = jest.fn()
    const id = 1

    store.hotUpdate({
      mutations: {
        [LOAD_PROFILE_INIT]: loadProfileInit,
        [LOAD_PROFILE_SUCCESS]: loadProfileSuccess,
        [LOAD_PROFILE_FAIL]: loadProfileFail
      }
    })

    return store.dispatch('getProfileById', id).then(_ => {
      expect(loadProfileInit).toHaveBeenCalled()
      expect(loadProfileSuccess).toHaveBeenCalledWith(store.state, mockRequest.data)
      expect(loadProfileFail).not.toHaveBeenCalled()
    })
  })

  test('should call [ADD_PROFILE_INIT, ADD_PROFILE_SUCCESS] on sucess request', () => {
    const addProfileInit = jest.fn()
    const addProfileSuccess = jest.fn()
    const addProfileFail = jest.fn()

    store.hotUpdate({
      mutations: {
        [ADD_PROFILE_INIT]: addProfileInit,
        [ADD_PROFILE_SUCCESS]: addProfileSuccess,
        [ADD_PROFILE_FAIL]: addProfileFail
      }
    })

    return store.dispatch('addProfile', {}).then(_ => {
      expect(addProfileInit).toHaveBeenCalled()
      expect(addProfileSuccess).toHaveBeenCalledWith(store.state, mockRequest.data)
      expect(addProfileFail).not.toHaveBeenCalled()
    })
  })

  test('should call [UPDATE_PROFILE_INIT, UPDATE_PROFILE_SUCCESS] on sucess request', () => {
    const updateProfileInit = jest.fn()
    const updateProfileSuccess = jest.fn()
    const updateProfileFail = jest.fn()

    store.hotUpdate({
      mutations: {
        [UPDATE_PROFILE_INIT]: updateProfileInit,
        [UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
        [UPDATE_PROFILE_FAIL]: updateProfileFail
      }
    })

    return store.dispatch('updateProfileById', {}).then(_ => {
      expect(updateProfileInit).toHaveBeenCalled()
      expect(updateProfileSuccess).toHaveBeenCalledWith(store.state, mockRequest.data)
      expect(updateProfileFail).not.toHaveBeenCalled()
    })
  })
})

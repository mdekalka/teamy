// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// import { profileMutations } from '../../../src/store/mutations'
// import { profileActions } from '../../../src/store/actions'
// import { profileState } from '../../../src/store/initialState'
// import { profileGetters } from '../../../src/store/getters'
// import { LOAD_PROFILES_INIT, LOAD_PROFILES_SUCCESS } from '../../../src/store/types'

// const getProfileState = (store) => store.getters.profileState

// describe('testing store profile actions', () => {
//   let store
//   let setMockData

//   beforeEach(() => {
//     setMockData = jest.fn()

//     store = new Vuex.Store({
//       state: {
//         profileState: { ...profileState }
//       },
//       mutations: profileMutations,
//       actions: profileActions,
//       getters: profileGetters
//     })
//   })

//   // it('get profiles action', () => {
//   //   let count = 0
//   //   let data

//   //   let mockCommit = (state, payload) => {
//   //     data = payload
//   //     count += 1
//   //   }

//   //   actions.getAsync({ commit: mockCommit })
//   //     .then(() => {
//   //       expect(count).toBe(1)
//   //       expect(data).toEqual({ title: 'Mock with Jest' })
//   //   })
//   // })

//   it('tests using a mock mutation but real store', () => {
//     const loadProfileInit = jest.fn()
//     const loadProfileSuccess = jest.fn()

//     store.hotUpdate({
//       mutations: {
//         LOAD_PROFILES_INIT: loadProfileInit,
//         LOAD_PROFILES_SUCCESS: loadProfileSuccess
//       }
//     })

//     const profileState = getProfileState(store)

//     expect(profileState.isLoading).toBe(false)

//     return store.dispatch('getProfiles')
//       .then(_ => {
//         expect(loadProfileInit).toHaveBeenCalled()
//         expect(loadProfileSuccess).toHaveBeenCalled()

//         // expect(setDataMock.mock.calls[0][1])
//         //   .toEqual({ title: 'Mock with Jest' })
//         // expect(setDataMock.mock.calls).toHaveLength(1)
//       })
//   })

//   // it('tests using a mock axios and full store ', () => {
//   //   return store.dispatch('getAsync')
//   //     .then(() => expect(store.state.data)
//   //       .toEqual({ title: 'Mock with Jest' } )
//   //     )
//   // })
// })

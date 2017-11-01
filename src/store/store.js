import Vue from 'vue'
import Vuex from 'vuex'

import { profileState } from './initialState'
import { profileActions } from './actions'
import { profileGetters } from './getters'
import { profileMutations } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    profileState
  },
  mutations: Object.assign({}, profileMutations),
  actions: Object.assign({}, profileActions),
  getters: Object.assign({}, profileGetters)
})

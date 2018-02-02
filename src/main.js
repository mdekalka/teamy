// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueScrollTo from 'vue-scrollto'
import axios from 'axios'

import store from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/styles/main.scss'

// Shim for promise finally
require('promise.prototype.finally').shim()

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(VueScrollTo, {
  container: '#content-page',
  duration: 300,
  easing: 'ease',
  offset: 0,
  cancelable: true
})

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'

export const getVueEl = (Component, props) => {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData: props }).$mount()

  return vm.$el
}

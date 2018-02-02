import Vue from 'vue'

const getContext = (Component, props = {}, data = {}) => {
  const Ctor = Vue.extend(Component)

  return new Ctor({ propsData: props, data }).$mount()
}

export const getVueInstance = (Component, props) => {
  return getContext(Component, props)
}

export const getVueEl = (Component, props) => {
  return getVueInstance(Component, props).$el
}

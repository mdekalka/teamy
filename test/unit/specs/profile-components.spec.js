import { mount, shallow } from '@vue/test-utils'

import itemChoser from '../../../src/components/common/item-choser'
import messagePanel from '../../../src/components/common/message-panel'

describe('testing [itemChoser] component', () => {
  test('should render active item name', () => {
    const props = {
      item: {
        id: 1,
        name: 'Test name'
      }
    }

    const wrapper = mount(itemChoser, { propsData: props })

    expect(wrapper.text()).toBe(props.item.name)
  })

  test('should render empty item name', () => {
    const item = {
      id: 1
    }

    const wrapper = mount(itemChoser, { propsData: { item } })

    expect(wrapper.text()).toBe('')
  })

  test('should have [color, borderColor] of selected item', () => {
    const data = {
      item: {
        id: 1,
        color: 'red'
      },
      selected: {
        1: {}
      }
    }

    const wrapper = mount(itemChoser, { propsData: data })

    expect(wrapper.element.style.color).toEqual(data.item.color)
    expect(wrapper.element.style.borderColor).toEqual(data.item.color)
  })

  test('should have snapshot structure', () => {
    const wrapper = shallow(itemChoser)

    expect(wrapper.element).toMatchSnapshot()
  })

  test('should trigger [click] event with item data', () => {
    const onSelect = jest.fn(item => item)
    const data = {
      item: {
        id: 1,
        name: 'Test name'
      }
    }
    const wrapper = shallow(itemChoser, { propsData: data })

    wrapper.vm.$on('on-select', onSelect)

    wrapper.trigger('click')
    wrapper.find('.item-choser').trigger('click')

    expect(onSelect).toHaveBeenCalledWith(data.item)
  })
})

describe('testing [messagePanel] component', () => {
  test('should have snapshot structure', () => {
    const data = {
      show: true
    }

    const wrapper = shallow(messagePanel, { propsData: data })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('should have div[.message-text] with provided message', () => {
    const data = {
      show: true,
      message: 'Test message'
    }

    const wrapper = mount(messagePanel, { propsData: data })

    expect(wrapper.find('.message-text').text()).toEqual(data.message)
  })

  test('should adds additional classes to [.message-panel] div', () => {
    const data = {
      show: true,
      type: 'test-class'
    }

    const wrapper = mount(messagePanel, { propsData: data })

    expect(wrapper.classes()).toContain(data.type)
  })

  test('should render slot content', () => {
    const data = {
      show: true,
      type: 'test-class'
    }
    const slot = { default: '<div class="test-slot"></div>' }

    const wrapper = mount(messagePanel, { propsData: data, slots: slot })

    expect(wrapper.findAll('.test-slot').length).toBe(1)
  })
})


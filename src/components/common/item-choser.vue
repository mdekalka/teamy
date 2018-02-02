<template>
  <div
    @click="$emit('on-select', item)" class="item-choser" :style="active">
    {{item.name}}
  </div>
</template>

<script>
export default {
  name: 'item-choser',

  props: {
    item: {
      type: Object,
      default: {}
    },
    selected: {
      type: Object,
      default: {}
    },
    'on-select': {
      type: Function,
      default: () => {}
    }
  },

  computed: {
    active () {
      return this.selected[this.item.id] ? {color: this.item.color, borderColor: this.item.color} : null
    }
  }
}
</script>

<style lang="scss">
.item-choser {
  display: inline-block;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid $gray-5;
  margin-right: 8px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    border: 1px solid $green-2;
  }
}
</style>



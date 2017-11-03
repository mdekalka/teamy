<template>
  <div class="item-choser">
    <div @click="$emit('on-select', item)" :class="['item-choser-row']" v-for="item in items" :key="item.id">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'item-choser',

  props: {
    items: {
      type: Array,
      default: []
    },

    'on-select': {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.item-choser {
  .item-choser-row {
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
}
</style>



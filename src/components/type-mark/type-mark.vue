<template>
  <div class="type-mark">
    <i class="fa fa-fw fa-bug" aria-hidden="true" v-if="type ==types[0]"></i>
    <i class="fa fa-fw fa-list-alt" aria-hidden="true" v-else-if="type ==types[1]"></i>
    <i class="fa fa-fw fa-map-o" aria-hidden="true" v-else-if="type ==types[2]"></i>
    <i class="fa fa-fw fa-ban" aria-hidden="true" v-else-if="type ==types[3]"></i>
  </div>
</template>

<script>
import { TASK_TYPES as types } from '@/config/config'

export default {
  name: 'type-mark',

  props: {
    type: {
      type: String,
      default: ''
    }
  },

  created () {
    this.types = types
  },

  methods: {
    render () {
      return '<div>piupiupiu</div>'
    }
  }
}
</script>

<style lang="scss">
.type-mark {
  .fa {
    font-size: 14px;
    color: $gray-1;
  }
}
</style>



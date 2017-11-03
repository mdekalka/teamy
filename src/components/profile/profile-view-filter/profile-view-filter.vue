<template>
  <div class="options-panel profile-filter-panel">
    <div class="filter-row">
      <icon-input placeholder="Filter by name" :has-clear="true" :model="query" @on-clear="onHandleClear" @input="onInput" />
    </div>
    <div class="filter-row">
      <item-choser :items="roles" @on-select="" />
    </div>
    <div class="filter-row">
    task count
    </div>
  </div>
</template>

<script>
import iconInput from '@/components/common/icon-input'
import itemChoser from '@/components/common/item-choser'

import { ROLES } from '@/config/config'
import { extendWithColors } from '@/components/profile/profile-service'

const rolesList = extendWithColors(ROLES)

export default {
  name: 'profile-view-filter',

  props: {
    'on-clear': {
      type: Function,
      default: () => {}
    },
    input: {
      type: Function,
      default: () => {}
    },
    query: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      roles: rolesList
    }
  },

  components: { iconInput, itemChoser },

  methods: {
    onHandleClear () {
      this.$emit('on-clear')
    },

    onInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
.profile-filter-panel {
  margin-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid $green-3;

  .filter-row {
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
}
</style>



<template>
  <div class="options-panel profile-filter-panel">
    <div class="filter-row">
      <icon-input placeholder="Filter by name" :has-clear="true" :model="filters.filterQuery" @on-clear="onHandleClear" @input="onInput" />
    </div>
    <div class="filter-row">
      <item-choser v-for="item in roles" :item="item" :key="item.id" :selected="filters.filterRoles" @on-select="onHandleSelect" />
    </div>
    <div class="filter-row">
      <vue-slider ref="slider" v-model="filters.filterTaskCount" :min="0" :max="10" width="180px" :height="3" />
    </div>
    <div v-if="!isFilterEmpty" class="filter-row clear-filter" @click="$emit('on-clear-all')">
      <i class="fa fa-times" aria-hidden="true"></i>
      clear filters
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

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
    'on-select': {
      type: Function,
      default: () => {}
    },
    'on-clear-all': {
      type: Function,
      default: () => {}
    },
    'is-filter-empty': {
      type: Boolean,
      default: true
    },
    input: {
      type: Function,
      default: () => {}
    },
    filters: {
      type: Object,
      default: {}
    }
  },

  components: { iconInput, itemChoser, vueSlider },

  data () {
    return {
      roles: rolesList
    }
  },

  methods: {
    onHandleClear () {
      this.$emit('on-clear')
    },

    onInput (value) {
      this.$emit('input', value)
    },

    onHandleSelect (item) {
      this.$emit('on-select', item)
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

  .clear-filter {
    color: $gray-5;
    cursor: pointer;

    .fa {
      font-size: 14px;
      color: $red-2;
    }
  }
}
</style>



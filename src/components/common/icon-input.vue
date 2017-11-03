<template>
  <div :class="['icon-input', hasClear ? 'has-clear': '']">
    <i class="fa fa-filter" aria-hidden="true"></i>
    <input type="text" class="form-control" :placeholder="placeholder" @input="$emit('input', $event.target.value)" :value="model" />
    <i v-if="hasClear" @click="$emit('on-clear')" class="fa fa-times" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: 'icon-input',

  props: {
    placeholder: {
      type: String,
      default: 'Search...'
    },
    'has-clear': {
      type: Boolean,
      default: false
    },
    'on-clear': {
      type: Function,
      default: () => {}
    },
    input: {
      type: Function,
      default: () => {}
    },
    model: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.icon-input {
  position: relative;
  width: 300px;

  &.has-clear {
    .form-control {
      padding-right: 25px;
    }
  }

  .form-control {
    padding-left: 30px;

    &::-ms-clear {
      display: none;
    }
  }

  .fa-filter,
  .fa-times {
    font-size: 14px;
    color: $gray-5;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .fa-times {
    left: auto;
    right: 10px;
    cursor: pointer;

    &:hover {
      color: $gray-4;
    }
  }
}
</style>

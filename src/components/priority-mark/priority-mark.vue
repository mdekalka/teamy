<template>
  <div class="priority-mark" :class="color"></div>
</template>

<script>
export default {
  name: 'priority-mark',

  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.priority-mark {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.minor {
    background-color: #00ACC1;
  }

  &.medium {
    background-color: #FDD835;
  }

  &.major {
    background-color: #FB8C00;
  }

  &.blocker {
    background-color: #D32F2F;
  }
}
</style>



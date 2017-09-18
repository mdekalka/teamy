<template>
  <div class="task-block">
    <span class="task-row-name">{{label}}</span>
    <span class="task-row-description">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'task-block',

  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.task-block {
  margin-bottom: 8px;

  &.block {
    .task-row-name,
    .task-row-description {
      display: block;
    }
  }

  .task-row-name,
  .task-row-description {
    display: inline-block;
  }
}
</style>



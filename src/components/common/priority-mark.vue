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

  @include extendWithTypes();
}
</style>



<template>
  <div class="loader-container">
    <div :class="['loader', end ? 'end' : '']"></div>
  </div>
</template>

<script>
export default {
  name: 'loader',

  props: {
    inline: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.loader-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $transparent-black;

  .loader {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 2px solid $main-gray;
    border-top: 2px solid $main-green;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    &.end {
      animation: none;
      border: 2px solid $main-green;
    }
  }
}
</style>


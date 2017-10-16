<template>
  <div :class="['loader-container', inline ? 'inline-container' : 'block-container']">
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

.inline-container {
  text-align: center;
}

.block-container {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>


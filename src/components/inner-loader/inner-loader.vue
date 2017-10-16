<template>
  <div class="inner-loader">
    <span class="loader-box"></span>
    <span class="loader-box"></span>
    <span class="loader-box"></span>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'inner-loader',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.inner-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);

  .title {
    color: $main-green;
    letter-spacing: 1px;
  }

  .loader-box {
    display: inline-block;
    margin-right: 6px;
    width: 2px;
    height: 20px;
    background-color: $main-green;

    &:last-child {
      margin-right: 0;
    }

    &:nth-child(1) {
      animation: grow 1s ease-in-out infinite;
    }

    &:nth-child(2) {
      animation: grow 1s ease-in-out 0.15s infinite;
    }

    &:nth-child(3) {
      animation: grow 1s ease-in-out 0.30s infinite;
    }
  }
}
</style>



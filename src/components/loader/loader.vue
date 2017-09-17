<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style lang="scss">
.loader-container {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
  // background-color: rgba(0, 0, 0, .1);

  .loader {
    width: 50px;
    height: 50px;
    border: 2px solid $main-gray;
    border-top: 2px solid $main-green;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}
</style>


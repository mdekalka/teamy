<template>
  <header class="main-header">
    {{title}}
  </header>
</template>

<script>
export default {
  name: 'main-header',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.main-header {
  background-color: $black-2;
  padding: 15px 20px;
}
</style>


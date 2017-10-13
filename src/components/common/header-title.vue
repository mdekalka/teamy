<template>
  <div class="header-title">
    <h4 :class="{'title': true, 'underline': underline}">{{title}}</h4>
  </div>
</template>

<script>
export default {
  name: 'header-title',

  props: {
    title: {
      type: String,
      default: ''
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-title {
    color: $main-green;

    .title {
      display: inline-block;
      padding-bottom: 6px;

      &.underline {
        border-bottom: 1px solid $main-green;
      }
    }
  }
</style>

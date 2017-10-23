<template>
  <div class="item-row">
    <div class="item-row-title" :style="{width: [offset ? `${offset}px` : 'auto']}" title="Name">{{title}}</div>
    <div class="item-row-text"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'item-row',

  props: {
    title: {
      type: String,
      default: ''
    },
    offset: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss">
.item-row {
  word-break: break-word;
  margin-bottom: 10px;
  @include clearfix();

  &:last-child {
    margin-bottom: 0;
  }
}

.item-row-title {
  float: left;
  margin-right: 10px;
  color: $gray-2;
}

.item-row-text {
  overflow: hidden;
}
</style>



<template>
  <div class="side-panel" :class="{'is-open': isOpen}">
    <div class="side-panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-panel',

  props: {
    'is-open': {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.side-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  transition: z-index ease-in .4s;

  &.is-open {
    z-index: 999;

    > .side-panel-body {
      transform: translateX(0);
    }
  }

  > .side-panel-body {
    position: absolute;
    height: 100%;
    max-height: 100%;
    width: 320px;
    padding: 15px;
    overflow: auto;
    background-color: $black-1;
    transform: translateX(100%);
    transition: transform ease-in .3s;
    z-index: -1;
  }
}
</style>


<template>
  <div :class="['page', loadScreen ? 'hidden': '']">
    <slot></slot>
    <loader v-if="loadScreen" />
  </div>
</template>

<script>
import loader from '@/components/loader/loader'
export default {
  name: 'content-layout',

  components: { loader },

  props: {
    'load-screen': {
      type: Boolean,
      default: false
    }
  }
}
</script>



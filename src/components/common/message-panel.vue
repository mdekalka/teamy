<template >
  <transition v-if="isShown" name="message-fade">
    <div :class="['message-panel', type]">
      <div class="message-text">{{message}}<slot /></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'message-panel',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    showTime: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      autoHide: null,
      timeoutId: null
    }
  },

  methods: {
    selfDestroy () {
      this.autoHide = true
    }
  },

  computed: {
    isShown () {
      return this.show && !this.autoHide
    }
  },

  watch: {
    show: function (value) {
      if (value && !this.timeoutId && this.showTime) {
        this.timeoutId = setTimeout(_ => {
          this.selfDestroy()
          clearTimeout(this.timeoutId)
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
.message-panel {
  padding: 12px 25px;
  background-color: $black-2;
  color: $main-green;
  margin-top: 20px;
  border: 1px solid $black-3;
  animation: fadeInDown .3s 0s ease;
  transform: translateZ(0);

  &.danger {
    color: $red-2;
  }

  &.warning {
    color: $main-yellow;
  }
}

.message-fade-leave-active {
  animation: fadeOutDown .3s 0s ease;
}
</style>



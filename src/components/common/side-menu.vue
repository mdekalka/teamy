<template>
  <div class="side-menu">
    <nav class="side-nav">
      <ul class="side-menu-list" @mouseleave="onMenuLeave">
         <template v-for="menuItem in sideMenu">
           <router-link
            class="side-menu-item"
            tag="li"
            :key="menuItem.id"
            exact
            :to="menuItem.route"
            @click.native="onLinkClick"
            @mouseover.native="onLinkOver"><a>{{menuItem.name}}<i :class="['fa', menuItem.icon]" aria-hidden="true"></i></a>
          </router-link>
        </template>
      </ul>
      <!-- TODO: Create own magic-line directive  -->
      <div ref="magicLine" v-show="magicLineOptions.show" :style="{height: magicLineOptions.height, top: magicLineOptions.top}" class="magic-line"></div>
    </nav>
  </div>
</template>

<script>
import { SIDEMENU_ITEMS } from '@/config/config'

export default {
  name: 'side-menu',

  data () {
    return {
      showMagicLine: false,
      magicLineOptions: {
        show: false,
        height: 'auto',
        top: 'auto'
      }
    }
  },

  created () {
    this.sideMenu = SIDEMENU_ITEMS
  },

  mounted () {
    this.updateLine()
  },

  watch: {
    '$route': 'updateLine'
  },

  methods: {
    onLinkClick () {

    },

    updateStyles (target) {
      if (target) {
        this.magicLineOptions.show = true
        this.magicLineOptions.height = `${target.offsetHeight}px`
        this.magicLineOptions.top = `${target.offsetTop}px`
      } else {
        this.magicLineOptions.show = false
      }
    },

    updateLine () {
      window.requestAnimationFrame(_ => {
        this.link = document.querySelector('.router-link-active')

        this.updateStyles(this.link)
      })
    },

    onLinkOver (event) {
      const link = event.currentTarget

      this.updateStyles(link)
    },

    onMenuLeave (event) {
      const link = document.querySelector('.router-link-active')

      this.updateStyles(link)
    }
  }
}
</script>

<style lang="scss">
.side-nav {
  position: relative;
  height: 100%;
}

.side-menu {
  position: relative;
  flex: 0 0 auto;
  width: 240px;
  max-height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 2px;
    right: 0;
    background-color: $black-1;
  }

  &-item {
    text-align: right;

    &.router-link-active {
      > a {
        color: $main-green;
      }
    }

    > a {
      display: block;
      padding: 15px 20px;
      color: $white;
      font-weight: 300;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 14px;
      transition: all .1s ease;

      &:hover {
        color: $main-green;
      }
    }

    .fa {
      margin-left: 20px;
    }
  }
}

.magic-line {
  position: absolute;
  width: 2px;
  right: 0;
  background-color: $main-green;
  transition: all .3s ease;
}
</style>


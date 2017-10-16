<template>
  <div class="side-menu">
    <nav class="side-nav">
      <ul class="side-menu-list">
        <!--TODO: Refactor this to array of lists  -->
        <template v-for="menuItem in sideMenu">
          <router-link
            class="side-menu-item"
            tag="li"
            :key="menuItem.id"
            exact
            :to="menuItem.route"
            @click.native="onLinkClick"
            @mouseover.native="onLinkOver"
            @mouseout.native="onLinkOut"><a>{{menuItem.name}}<i :class="['fa', menuItem.icon]" aria-hidden="true"></i></a>
          </router-link>
        </template>
      </ul>
      <div ref="magicLine" class="magic-line"></div>
    </nav>
  </div>
</template>

<script>
import { setStyles } from '@/utils/utils'

import { SIDEMENU_ITEMS } from '@/config/config'

export default {
  name: 'side-menu',

  created () {
    this.sideMenu = SIDEMENU_ITEMS
  },

  mounted () {
    this.link = document.querySelector('.router-link-active')

    if (this.link) {
      setStyles(this.$refs.magicLine, {
        height: `${this.link.offsetHeight}px`,
        top: `${this.link.offsetTop}px`
      })
    }
  },

  methods: {
    onLinkClick () {

    },

    onLinkOver (event) {
      const link = event.currentTarget

      if (link) {
        setStyles(this.$refs.magicLine, {
          height: `${link.offsetHeight}px`,
          top: `${link.offsetTop}px`
        })
      }
    },

    onLinkOut () {
      const link = document.querySelector('.router-link-active')

      if (link) {
        setStyles(this.$refs.magicLine, {
          height: `${link.offsetHeight}px`,
          top: `${link.offsetTop}px`
        })
      }
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


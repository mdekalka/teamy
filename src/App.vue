<template>
  <div id="app">
    <div class="page-wrapper">
      <main class="main">
        <side-menu />
        <div class="main-content">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import sideMenu from '@/components/common/side-menu'

export default {
  name: 'app',

  components: {
    sideMenu
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100%;
}
</style>


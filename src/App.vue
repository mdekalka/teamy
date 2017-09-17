<template>
  <div id="app">
    <div class="page-wrapper">
      <main-header />
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
import mainHeader from '@/components/main-header/main-header'
import sideMenu from '@/components/side-menu/side-menu'

export default {
  name: 'app',

  components: {
    mainHeader,
    sideMenu
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100%;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  flex: 1 1 100%;
  max-height: 100%;

  &-content {
    display: flex;
    flex: 1 1 100%;
    height: 100%;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>


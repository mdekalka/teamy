<template>
  <div id="app">
    <div class="page-wrapper">
      <main-header title="Learn Vue/Vuex by building CRUD application." />
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
</style>


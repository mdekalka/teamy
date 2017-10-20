<template>
  <content-layout class="home-page">
    <div class="home-block">
      <h3 class="home-heading">Learn Vue/Vuex by building CRUD application.</h3>
    </div>
  </content-layout>
</template>

<script>
import contentLayout from '@/components/common/content-layout'

export default {
  name: 'home-page',

  components: { contentLayout }
}
</script>

<style lang="scss">
.home-page {
  .home-block {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    .home-heading {
      color: $main-green;
    }
  }
}
</style>



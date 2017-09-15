<template>
  <div class="side-menu">
    <nav>
      <ul class="side-menu-list">
        <!-- https://codepen.io/LouVerdun/pen/aNdBaz?editors=1010  -->
        <router-link class="side-menu-item" tag="li" exact :to="'/'"><a>Team list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/tasks'"><a>Task list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/a'"><a>Task list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/b'"><a>Task list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/c'"><a>Task list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/d'"><a>Task list</a></router-link>
        <router-link class="side-menu-item" tag="li" :to="'/e'"><a>Task list</a></router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'side-menu'
}
</script>

<style lang="scss">
.side-menu {
  // http://fontawesome.io/icons/ folder + folder-open for icon
  position: relative;
  // flex-direction: column;
  flex: 0 0 auto;
  width: 260px;
  padding: 15px 0;
  max-height: 100%;
  border-right: 1px solid rgba(137, 176, 37, 0.48);
  overflow: hidden;
  overflow-y: auto;

  &-item {
    &.router-link-active {
      > a {
        background-color: $black-1;
        color: $main-green;
        border-left: 2px solid $main-green;
      }
    }

    > a {
      display: block;
      padding: 10px 20px;
      color: $white;

      &:hover {
        background-color: $black-1;
        color: $main-green;
      }
    }
  }
}
</style>


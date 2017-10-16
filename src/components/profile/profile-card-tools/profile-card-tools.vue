<template>
  <div class="profile-card-tools">
    <a class="btn-icon"><i class="fa fw fa-pencil" aria-hidden="true"></i></a>
    <button class="btn-icon"><i class="fa fw fa-trash" aria-hidden="true"></i></button>
  </div>
</template>

<script>
export default {
  name: 'profile-card-tools'
}
</script>

<style lang="scss">
.profile-card-tools {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-flex;
}
</style>



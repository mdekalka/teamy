<template>
  <input v-model="filters.rating" class="filters__range" type="range"
          :min="rating.min" :max="rating.max" step="0.1" />
</template>

<script>
export default {
  name: 'range-input'
}
</script>

<style lang="scss">

</style>



<template>
  <b-modal id="task-edit-modal" ref="task-edit-modal"
            title="Edit task"
            @ok="onClickOK"
            @shown="onClickClose">
      <form @submit.stop.prevent="onSubmit">
      </form>
  </b-modal>
</template>

<script>
import taskProfileModel from '../task-profile-model'
export default {
  name: 'task-edit-modal',

  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    task: {
      type: Object,
      default: taskProfileModel,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>



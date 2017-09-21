<template>
  <b-modal id="task-edit-modal" ref="task-edit-modal"
           title="Edit task" @ok="onClickOK" @shown="onClickClose">
    <b-form>
      <b-form-group label="Edit name*:">
        <b-form-input v-model="task.name" type="text" placeholder="Edit name" ></b-form-input>
      </b-form-group>
      <b-form-group label="Edit type*:">
        <b-form-radio v-for="type in types" :bind="type.id" v-model="selected" :options="options"></b-form-radio>

      </b-form-group>
      <b-form-group label="Edit description*:">
        <b-form-textarea id="edit-description" v-model="task.description" placeholder="Edit description" :rows="3" :max-rows="6">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Edit print:">
        <b-form-input v-model="task.sprint" type="text" placeholder="Edit sprint" ></b-form-input>
      </b-form-group>
      <b-form-group label="Edit labels:">
        <b-form-input v-model="task.labels" type="text" placeholder="Edit labels" ></b-form-input>
      </b-form-group>
      <b-form-group label="Edit environment:">
        <b-form-input v-model="task.environment" type="text" placeholder="Edit environment" ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import taskProfileModel from '../task-profile-model'
import { TASK_TYPES as types } from '@/config/config'
// import { TASK_STATUSES as statuses } from '@/config/config'
// import { TASK_PRIORITIES as priorities } from '@/config/config'

export default {
  name: 'task-edit-modal',

  created () {
    this.types = types
    // this.statuses = statuses
    // this.priorities = priorities
  },

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



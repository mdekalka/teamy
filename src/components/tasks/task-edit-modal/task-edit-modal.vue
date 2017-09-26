<template>
  <b-modal id="task-edit-modal" ref="task-edit-modal"
           title="Edit task" @ok="validateBeforeSubmit" @hide="onClose" @cancel="onClose">
    <b-form>
      <b-form-group label="Edit name*:">
        <b-form-input v-model.trim="task.name" :state="validateName" type="text" placeholder="Edit name" ></b-form-input>
        <b-form-feedback id="name-feedback">Name cannot be empty</b-form-feedback>
      </b-form-group>
      <b-form-group label="Edit type*:">
        <b-form-radio v-model="task.type" :options="types"></b-form-radio>
      </b-form-group>
      <b-form-group label="Edit status*:">
        <b-form-radio v-model="task.status" :options="statuses"></b-form-radio>
      </b-form-group>
      <b-form-group label="Edit priority*:">
        <b-form-radio v-model="task.priority" :options="priorities"></b-form-radio>
      </b-form-group>
      <b-form-group label="Edit description*:">
        <b-form-textarea id="edit-description" v-model.trim="task.description" :state="validateDescription" placeholder="Edit description" :rows="3" :max-rows="6">
        </b-form-textarea>
        <b-form-feedback id="name-description">Description cannot be empty</b-form-feedback>
      </b-form-group>
      <b-form-group label="Edit print:">
        <b-form-input v-model.trim="task.sprint" type="text" placeholder="Edit sprint" ></b-form-input>
      </b-form-group>
      <b-form-group label="Edit labels:">
        <b-form-input v-model="task.labels" type="text" placeholder="Edit labels" ></b-form-input>
      </b-form-group>
      <b-form-group label="Edit environment:">
        <b-form-input v-model.trim="task.environment" type="text" placeholder="Edit environment" ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import taskProfileModel from '../task-profile-model'
import { TASK_TYPES as types, TASK_STATUSES as statuses, TASK_PRIORITIES as priorities } from '@/config/config'
import { capitalize } from '@/utils/utils'

export default {
  name: 'task-edit-modal',

  props: {
    task: {
      type: Object,
      default: () => taskProfileModel,
      required: true
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    onApply: {
      type: Function,
      default: () => {}
    }
  },

  created () {
    this.types = this.formatOptions(types)
    this.statuses = this.formatOptions(statuses)
    this.priorities = this.formatOptions(priorities)
  },

  methods: {
    formatOptions (options) {
      return options.map(option => {
        return {
          id: option.id,
          text: capitalize(option.title),
          value: option.key
        }
      })
    },

    onClose (event) {
      if (event.trigger === 'ok') {
        return
      }

      this.onCancel()
    },

    validateBeforeSubmit (event) {
      const isInvalid = !!(this.validateName || this.validateDescription)

      if (isInvalid) {
        event.preventDefault()
        return
      }

      this.onApply()
    }
  },

  computed: {
    validateName () {
      return this.task.name.length > 0 ? null : 'invalid'
    },
    validateDescription () {
      return this.task.description.length > 0 ? null : 'invalid'
    }
  }
}
</script>

<style lang="scss">

</style>



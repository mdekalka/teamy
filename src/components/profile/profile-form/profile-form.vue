<template>
  <b-form @submit.prevent="onSubmit" novalidate>
    <b-row>
      <b-col>
        <b-form-group  id="profile-name" label="Name:" label-for="profile-name">
          <!-- NOTE: vue-bootstrap components does not work well with vee-validate(needed timeout for validation - check this)  -->
          <input id="profile-name" name="profile-name" type="text" v-validate="'required'" v-model="form.name.first"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-name')}" autocomplete="off" placeholder="Enter name">
          <span class="small text-danger" v-show="errors.has('profile-name')">Name is required</span>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group id="profile-surname" label="Surname:" label-for="profile-surname">
          <input id="profile-surname" name="profile-surname" type="text" v-validate="'required'" v-model="form.name.last"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-surname')}" autocomplete="off" placeholder="Enter surname">
          <span class="small text-danger" v-show="errors.has('profile-surname')">Surname is required</span>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group id="profile-title" label="Title:" label-for="profile-title">
      <input id="profile-title" name="profile-title" type="text" v-validate="'required'" v-model="form.title"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-title')}" autocomplete="off" placeholder="Enter title">
      <span class="small text-danger" v-show="errors.has('profile-title')">Title is required</span>
    </b-form-group>

      <b-form-group id="profile-gender" label="Gender:" label-for="profile-gender">
        <label class="custom-control custom-radio">
          <input name="profile-gender" v-model="form.gender" v-validate="'required'" type="radio" autocomplete="off" class="custom-control-input" value="male">
            <span aria-hidden="true" class="custom-control-indicator"></span>
            <span class="custom-control-description">Male</span>
        </label>
        <label class="custom-control custom-radio">
          <input name="profile-gender" v-model="form.gender" type="radio" autocomplete="off" class="custom-control-input" value="female">
            <span aria-hidden="true" class="custom-control-indicator"></span>
            <span class="custom-control-description">Female</span>
        </label>
        <span class="small text-danger" v-show="errors.has('profile-gender')">Please choose your gender</span>
      </b-form-group>

    <b-form-group id="profile-email" label="Email:" label-for="profile-email">
      <input id="profile-email" name="profile-email" type="text" v-validate="'required|email'" data-vv-as="First Name" v-model="form.email"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-email')}" placeholder="Enter email">
      <span class="small text-danger" v-show="errors.has('profile-email:required')">Email is required</span>
      <span class="small text-danger" v-show="errors.has('profile-email:email')">Email must be valid</span>
    </b-form-group>

    <b-form-group id="profile-phone" label="Phone*:" label-for="profile-phone">
      <input id="profile-phone" type="text" v-model="form.phone" class="form-control" placeholder="Phone(optional)">
    </b-form-group>

    <b-button type="submit" variant="primary" :disabled="loading">{{submitTitle}}</b-button>
  </b-form>
</template>

<script>
import profileMode from '@/components/profile/profile-model'

export default {
  name: 'new-profile-form',

  props: {
    form: {
      type: Object,
      default: profileMode
    },
    'handle-profile': {
      type: Function,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    'submit-title': {
      type: String,
      default: 'Submit'
    }
  },

  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('handle-profile', this.form)
        }
      })
    }
  }
}
</script>

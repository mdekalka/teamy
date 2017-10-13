<template>
  <b-form @submit.prevent="onSubmit" novalidate>
    <b-row>
      <b-col>
        <b-form-group  id="profile-name" label="Name:" label-for="profile-name">
          <b-form-input
            id="profile-name" name="profile-name" data-vv-delay="100" v-validate="'required'"
            :class="{'is-invalid': errors.has('profile-name')}" type="text" v-model="form.name.first"
            autocomplete="off" placeholder="Enter name">
          </b-form-input>
          <span class="small text-danger" v-show="errors.has('profile-name')">Name is required</span>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group id="profile-surname" label="Surname:" label-for="profile-surname">
          <b-form-input
            id="profile-surname" name="profile-surname" data-vv-delay="100" v-validate="'required'"
            :class="{'is-invalid': errors.has('profile-surname')}" type="text" v-model.trim="form.name.last"
            autocomplete="off" placeholder="Enter surname">
          </b-form-input>
          <span class="small text-danger" v-show="errors.has('profile-surname')">Surname is required</span>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group id="profile-title" label="Title:" label-for="profile-title">
      <b-form-input
        id="profile-title" name="profile-title" data-vv-delay="100" v-validate="'required'"
        :class="{'is-invalid': errors.has('profile-title')}" type="text" v-model.trim="form.title"
        autocomplete="off" placeholder="Enter title">
      </b-form-input>
      <span class="small text-danger" v-show="errors.has('profile-title')">Title is required</span>
    </b-form-group>

      <b-form-group id="profile-gender" label="Gender:" label-for="profile-gender">
      <b-form-radio-group
        id="profile-gender" name="profile-gender"  :class="{'is-invalid': errors.has('profile-gender')}"
        v-model="form.gender">
        <b-form-radio v-validate="'required'" value="male">Male</b-form-radio>
        <b-form-radio value="female">Female</b-form-radio>
      </b-form-radio-group>
      <span class="small text-danger" v-show="errors.has('profile-gender')">Please choose a gender</span>
      </b-form-group>

    <b-form-group id="profile-email" label="Email:" label-for="profile-email">
      <b-form-input
        id="profile-email" name="profile-email" data-vv-delay="100" v-validate="'required|email'"
        :class="{'is-invalid': errors.has('profile-email')}" type="email" v-model.trim="form.email"
        placeholder="Enter email">
      </b-form-input>
      <span class="small text-danger" v-show="errors.has('profile-email')">Email is required</span>
    </b-form-group>

    <b-form-group id="profile-phone" label="Phone*:" label-for="profile-phone">
      <b-form-input id="profile-phone" type="text" v-model.trim="form.phone" placeholder="Enter phone(optional)"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
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
    'create-profile': {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('create-profile', this.form)
        }
      })
    }
  }
}
</script>

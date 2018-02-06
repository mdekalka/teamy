<template>
  <b-form @submit.prevent="onSubmit" novalidate>
    <b-row>
      <b-col>
        <b-form-group  id="profile-name" label="Name*:" label-for="profile-name">
          <!-- NOTE: vue-bootstrap components does not work well with vee-validate(needed timeout for validation - check this)  -->
          <input id="profile-name" name="profile-name" type="text" v-validate="'required'" v-model="form.name.first"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-name')}" autocomplete="off" placeholder="Enter name">
          <span class="small text-danger" v-show="errors.has('profile-name')">Name is required</span>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group id="profile-surname" label="Surname*:" label-for="profile-surname">
          <input id="profile-surname" name="profile-surname" type="text" v-validate="'required'" v-model="form.name.last"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-surname')}" autocomplete="off" placeholder="Enter surname">
          <span class="small text-danger" v-show="errors.has('profile-surname')">Surname is required</span>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group id="profile-title" label="Title*:" label-for="profile-title">
      <input id="profile-title" name="profile-title" type="text" v-validate="'required'" v-model="form.title"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-title')}" autocomplete="off" placeholder="Enter title">
      <span class="small text-danger" v-show="errors.has('profile-title')">Title is required</span>
    </b-form-group>

    <b-row>
      <b-col>
        <b-form-group id="profile-gender" label="Gender*:" label-for="profile-gender">
          <div class="custom-control custom-radio custom-control-inline">
            <input name="profile-gender" id="gender-male" v-model="form.gender" v-validate="'required'" type="radio" autocomplete="off" class="custom-control-input" value="male">
            <label for="gender-male" class="custom-control-label">Male</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input name="profile-gender" id="gender-female" v-model="form.gender" type="radio" autocomplete="off" class="custom-control-input" value="female">
            <label for="gender-female" class="custom-control-label">Female</label>
          </div>

          <span class="small text-danger" v-show="errors.has('profile-gender')">Please choose your gender</span>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group id="profile-avatar" label="Avatar:" label-for="profile-avatar">
          <image-upload :model="form.picture.large" @image-load="onImageLoad" />
          <div v-if="!!filename">
            Selected image {{filename}}
            <button class="btn-icon" @click="$emit('clear-image')">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group id="profile-email" label="Email*:" label-for="profile-email">
      <input id="profile-email" name="profile-email" type="text" v-validate="'required|email'" data-vv-as="First Name" v-model="form.email"
                 :class="{'form-control': true, 'is-invalid': errors.has('profile-email')}" placeholder="Enter email">
      <span class="small text-danger" v-show="errors.has('profile-email:required')">Email is required</span>
      <span class="small text-danger" v-show="errors.has('profile-email:email')">Email must be valid</span>
    </b-form-group>

    <b-form-group id="profile-phone" label="Phone:" label-for="profile-phone">
      <input id="profile-phone" type="text" v-model="form.phone" class="form-control" placeholder="Phone(optional)">
    </b-form-group>

    <b-form-group id="profile-location" label="Location:" label-for="profile-location">
      <div class="additional-title">{{locationPreview}}</div>
      <marker-map :is-shown="isShownMap" :config="config" @map-click="onMapClick" @marker-move="onMarkerMove" @marker-drag-end="onMarkerDragEnd" />
    </b-form-group>

    <b-button type="submit" variant="primary" :disabled="loading">{{submitTitle}}</b-button>
  </b-form>
</template>

<script>
import ProfileModel from '@/components/profile/profile-model'
import MapModel from '@/components/common/marker-map/map-model'

import imageUpload from '@/components/common/image-upload/image-upload'
import markerMap from '@/components/common/marker-map/marker-map'

export default {
  name: 'new-profile-form',

  components: { imageUpload, markerMap },

  props: {
    form: {
      type: Object,
      default: () => new ProfileModel()
    },
    config: {
      type: Object,
      default: () => new MapModel()
    },
    'location-preview': {
      type: String,
      default: ''
    },
    filename: {
      type: String,
      default: ''
    },
    'is-shown-map': {
      type: Boolean,
      default: false
    },
    'map-click': {
      type: Function,
      default: () => {}
    },
    'marker-move': {
      type: Function,
      default: () => {}
    },
    'marker-drag-end': {
      type: Function,
      default: () => {}
    },
    'handle-profile': {
      type: Function,
      default: () => {}
    },
    'clear-image': {
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
    },
    'change-avatar': {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    onImageLoad (imageInfo) {
      this.$emit('change-avatar', imageInfo)
    },

    onMapClick (event) {
      this.$emit('map-click', event)
    },

    onMarkerMove (event) {
      this.$emit('marker-move', event)
    },

    onMarkerDragEnd (event) {
      this.$emit('marker-drag-end', event)
    },

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

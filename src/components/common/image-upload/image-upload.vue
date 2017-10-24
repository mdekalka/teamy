<template>
  <div class="image-upload">
    <label tabindex="0" class="input-file-label">
      <input class="input-file" type="file" @click="onFileClick" @change="onFileChange">
      Select avatar
    </label>
  </div>
</template>

<script>
export default {
  name: 'image-upload',

  props: {
    'image-load': {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    onFileChange (event) {
      const files = event.target.files || event.dataTransfer.files

      if (!files.length) {
        return
      }

      this.createImage(files[0])
    },

    onFileClick (event) {
      event.target.value = ''
    },

    createImage (file) {
      const fileReader = new FileReader()
      const _this = this

      fileReader.onload = (e) => {
        _this.$emit('image-load', { image: e.target.result, filename: file.name })
      }

      fileReader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss">
.image-upload {
  position: relative;

  .input-file-label {
    display: block;
    padding: 8px 20px;
    background-color: $black-2;
    color: $white;
    cursor: pointer;
  }

  .input-file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .input-file:hover + .input-file-label,
  .input-file:focus + .input-file-label,
  .input-file-label:hover,
  .input-file-label:focus {
    background-color: $black-1;
    color: $main-green;
  }
}

</style>



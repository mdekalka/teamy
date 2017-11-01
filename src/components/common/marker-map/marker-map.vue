<template>
  <div class="marker-map">
    <div class="map-container" v-if="isShown">
      <v-map
        :zoom="config.zoom" :center="config.center" :min-zoom="config.minZoom" :max-zoom="config.maxZoom"
        @l-click="onMapClick" @l-zoomanim="onZoomChange">
        <v-tilelayer :url="config.url" :attribution="config.attribution"></v-tilelayer>
        <v-marker
          :lat-lng="config.marker.position" :key="config.marker.id" :visible="config.marker.visible" :draggable="config.marker.draggable"
          @l-move="onMarkerMove($event)" @l-dragend="onMarkerDragEnd($event)" :icon="config.marker.icon">
        </v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'

import MapModel from './map-model'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// See open issue: https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow
})

export default {
  name: 'maker-map',

  props: {
    'is-shown': {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: new MapModel()
    },
    'zoom-changed': {
      type: Function,
      default: () => {}
    },
    'marker-moved': {
      type: Function,
      default: () => {}
    },
    'marker-drag-end': {
      type: Function,
      default: () => {}
    },
    'map-clicked': {
      type: Function,
      default: () => {}
    }
  },

  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },

  methods: {
    onZoomChange (event) {
      this.$emit('zoom-changed', event.target.getZoom())
    },

    onMarkerMove (event) {
      this.$emit('marker-move', event)
    },

    onMarkerDragEnd (event) {
      this.$emit('marker-drag-end', event)
    },

    onMapClick (event) {
      this.$emit('map-click', event)
    }
  }
}
</script>

<style lang="scss">
.marker-map {
  .map-container {
    width: 100%;
    height: 400px;
  }
}
</style>



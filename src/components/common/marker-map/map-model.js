import L from 'leaflet'
import Glyph from 'leaflet.icon.glyph' // eslint-disable-line

class MapModel {
  constructor () {
    this.zoom = 2
    this.center = L.latLng(51.505, -0.09)
    this.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    this.attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    this.marker = {
      position: L.latLng(0, 0),
      draggable: true,
      visible: true,
      icon: L.icon.glyph({
        prefix: '',
        glyph: 'You'
      })
    }
    this.minZoom = 1
    this.maxZoom = 20
    this.opacity = 0.6
  }
}

export default MapModel

import L from 'leaflet'
import Glyph from 'leaflet.icon.glyph' // eslint-disable-line

const mapConfig = {
  zoom: 3,
  center: L.latLng(51.505, -0.09),
  url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  marker: {
    position: L.latLng(0, 0),
    draggable: false,
    visible: false,
    icon: L.icon.glyph({
      prefix: '',
      glyph: 'You'
    })
  },
  minZoom: 1,
  maxZoom: 20,
  opacity: 0.6
}

export default mapConfig

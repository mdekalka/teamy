const profileMode = {
  id: null,
  name: {
    first: '',
    last: ''
  },
  title: '',
  gender: '',
  email: '',
  registered: '',
  phone: '',
  location: {
    street: '',
    city: '',
    state: '',
    postcode: null,
    latitude: null,
    longitude: null
  },
  picture: {
    large: '',
    thumbnail: ''
  },
  tasks: [],
  roles: []
}

export const getLocation = (currentLocation) => {
  const keys = ['city', 'state', 'street']
  let location = []

  keys.reduce((init, key) => {
    if (currentLocation[key]) {
      init.push(currentLocation[key])

      return init
    }
  }, location)

  return location.join(', ')
}

export default profileMode

class ProfileModel {
  constructor () {
    this.id = null
    this.name = {
      first: '',
      last: ''
    }
    this.title = ''
    this.gender = ''
    this.email = ''
    this.registered = ''
    this.phone = ''
    this.location = {
      street: '',
      city: '',
      state: '',
      postcode: null,
      latitude: null,
      longitude: null
    }
    this.picture = {
      large: '',
      thumbnail: ''
    }
    this.tasks = []
    this.roles = []
  }
}

export const getLocation = (currentLocation) => {
  const keys = ['city', 'state', 'street']

  const loc = keys.reduce((init, key) => {
    if (currentLocation[key]) {
      init.push(currentLocation[key])
    }

    return init
  }, [])

  return loc.join(', ')
}

export default ProfileModel

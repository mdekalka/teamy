export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const checkAddress = (field) => {
  return field ? field.long_name : ''
}

export const formatGoogleAddress = (data) => {
  if (data.length) {
    const primaryAddress = data[0]

    return {
      street: checkAddress(primaryAddress.address_components[1]),
      city: checkAddress(primaryAddress.address_components[2]),
      state: checkAddress(primaryAddress.address_components[4]),
      postcode: checkAddress(primaryAddress.address_components[6])
    }
  }
}

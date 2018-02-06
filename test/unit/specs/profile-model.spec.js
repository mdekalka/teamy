import ProfileModel, { getLocation, getFullName } from '../../../src/components/profile/profile-model'
import { mockProfileModel, mockProfileLocation, mockName } from '../../../__mocks__/mocks'

describe('testing profile model', () => {
  const instance = new ProfileModel()

  test('should create instance without providing data', () => {
    expect(instance).toBeInstanceOf(ProfileModel)
  })

  test('should equal default empty model', () => {
    expect(instance).toEqual(mockProfileModel)
  })

  test('should return [city, state, street] pattern', () => {
    const resultLocation = getLocation(mockProfileLocation)

    expect(resultLocation).toEqual(`${mockProfileLocation.city}, ${mockProfileLocation.state}, ${mockProfileLocation.street}`)
  })

  test('should return [city, street] pattern', () => {
    const currentLocation = { ...mockProfileLocation, state: null }
    const resultLocation = getLocation(currentLocation)

    expect(resultLocation).toEqual(`${mockProfileLocation.city}, ${mockProfileLocation.street}`)
  })

  test('should return [city] pattern', () => {
    const currentLocation = { ...mockProfileLocation, state: null, street: null }
    const resultLocation = getLocation(currentLocation)

    expect(resultLocation).toEqual(`${mockProfileLocation.city}`)
  })

  test('should return empty string if no location info', () => {
    const currentLocation = { ...mockProfileLocation, city: null, state: null, street: null }
    const resultLocation = getLocation(currentLocation)

    expect(resultLocation).toEqual('')
  })

  test('should return full name', () => {
    const resultName = getFullName(mockName)

    expect(resultName).toEqual(`${mockName.first} ${mockName.last}`)
  })

  test('should return only first name', () => {
    const currentName = { ...mockName, last: '' }
    const resultName = getFullName(currentName)

    expect(resultName).toEqual(mockName.first)
  })

  test('should return only last name', () => {
    const currentName = { ...mockName, first: '' }
    const resultName = getFullName(currentName)

    expect(resultName).toEqual(mockName.last)
  })

  test('should return empty string if no name exists', () => {
    const currentName = { first: '', last: '' }
    const resultName = getFullName(currentName)

    expect(resultName).toEqual('')
  })
})

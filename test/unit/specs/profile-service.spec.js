import { extendWithColors } from '../../../src/components/profile/profile-service'
import { mockProfiles } from '../../../__mocks__/mocks'

const checkRoles = (profiles, callback) => {
  profiles.forEach(profile => {
    profile.roles.forEach(role => {
      callback(role)
    })
  })
}

const extendedProfiles = (profiles) => profiles.map(profile => ({ ...profile, roles: extendWithColors(profile.roles) }))

// See [colorMapping] object in profile service to investigate what is color range
const outFromColorRange = 999

describe('testing profile service', () => {
  test('should extend roles with color', () => {
    const resultProfiles = extendedProfiles(mockProfiles)

    checkRoles(resultProfiles, role => {
      expect(role.color).toBeDefined()
    })
  })

  test('should not extend roles with color', () => {
    const unextendedProfiles = mockProfiles.map(profile => {
      return {
        ...profile,
        roles: profile.roles.map(role => {
          return { ...role, key: outFromColorRange }
        })
      }
    })

    const resultProfiles = extendedProfiles(unextendedProfiles)

    checkRoles(resultProfiles, role => {
      expect(role.color).toBeUndefined()
    })
  })
})

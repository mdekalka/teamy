import { profileGetters } from '../../../src/store/getters'
import { profileState } from '../../../src/store/initialState'

describe('testing profile getters', () => {
  const state = {
    profileState: { ...profileState }
  }

  test('get profile info', () => {
    const profileInfo = profileGetters.profileInfo(state)

    expect(profileInfo).toEqual(state.profileState)
  })
})

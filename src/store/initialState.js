import ProfileModel from '@/components/profile/profile-model'

export const profileState = {
  isLoading: false,
  profiles: [],
  profile: new ProfileModel(),
  createdId: null,
  loadErrorMessage: ''
}

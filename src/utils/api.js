import axios from 'axios'

import { GOOGLE_MAP_URL } from '@/config/config'

export const getGoogleLocation = (coords) => {
  const url = GOOGLE_MAP_URL(coords)

  return axios.get(url).then(({ data }) => {
    if (data.status === 'OK') {
      return data.results
    } else {
      throw new Error(data.status)
    }
  })
}

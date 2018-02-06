import { mockRequest } from './mocks'

const axios = {
  get: () => new Promise(resolve => resolve(mockRequest))
}

export default axios

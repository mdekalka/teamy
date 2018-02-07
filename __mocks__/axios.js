import { mockRequest } from './mocks'

const successRequest = () => new Promise(resolve => resolve(mockRequest))

const axios = {
  get: () => successRequest(),
  post: () => successRequest(),
  delete: () => successRequest(),
  patch: () => successRequest()
}

export default axios

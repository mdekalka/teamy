import axios from 'axios'
import { URL } from '../../config/url'

export const getTasks = () => {
  return axios.get(URL.tasks).then(({ data }) => data)
}

export const getTaskById = (id) => {
  return axios.get(`${URL.tasks}/${id}`).then(({ data }) => data)
}

export const updateTaskById = (id, updatedTask) => {
  return axios.patch(`${URL.tasks}/${id}`, updatedTask).then(({ data }) => data)
}

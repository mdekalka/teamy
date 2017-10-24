import axios from 'axios'

export const getTasks = () => {
  return axios.get(`/tasks`).then(({ data }) => data)
}

export const getTaskById = (id) => {
  return axios.get(`/tasks/${id}`).then(({ data }) => data)
}

export const updateTaskById = (id, updatedTask) => {
  return axios.patch(`/tasks/${id}`, updatedTask).then(({ data }) => data)
}

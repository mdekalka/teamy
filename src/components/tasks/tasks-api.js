import { wait } from '@/config/api'
import { STATUS } from '@/config/config'
import taskList from '@/mocks/taskList'
import axios from 'axios'

let tasks = taskList
const promiseTimeout = 2000

export const getTasks = () => {
  return axios.get(`/tasks/`).then(({ data }) => data)
}

export const getTaskById = (id) => {
  return wait(promiseTimeout).then(_ => {
    return tasks.find((task) => task.id === id)
  })
}

export const updateTaskById = (id, updatedTask) => {
  return wait(promiseTimeout).then(_ => {
    tasks.forEach((task, index) => {
      if (task.id === id) {
        tasks[index] = updatedTask
      }
    })

    return {
      status: STATUS.OK
    }
  })
}


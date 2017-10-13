import { wait } from '@/config/api'
import { STATUS } from '@/config/config'
import taskList from '@/mocks/taskList'

export const getTasks = () => {
  return wait(1000).then(() => {
    return taskList
  })
}

export const getFilteredTasks = (type, reversed) => {
  return wait(500).then(() => {
    return taskList.sort((a, b) => {
      return (a[type] === b[type] ? 0 : a[type] < b[type] ? -1 : 1) * (reversed ? -1 : 1)
    })
  })
}

export const getTaskById = (id) => {
  return wait(1000).then(() => {
    return taskList.find((task) => task.id === id)
  })
}

export const updateTaskById = (id, updatedTask) => {
  return wait(1000).then(() => {
    taskList.forEach((task, index) => {
      if (task.id === id) {
        taskList[index] = updatedTask
      }
    })

    return {
      status: STATUS.OK
    }
  })
}

import { wait } from '@/config/api'
import { STATUS } from '@/config/config'
import taskList from '@/mocks/taskList'

let tasks = taskList
const promiseTimeout = 2000

export const getTasks = () => {
  return wait(promiseTimeout).then(_ => {
    return [ ...tasks ]
  })
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

// Not used for now
// export const getFilteredTasks = (type, reversed) => {
//   return wait(promiseTimeout).then(_ => {
//     return tasks.sort((a, b) => {
//       return (a[type] === b[type] ? 0 : a[type] < b[type] ? -1 : 1) * (reversed ? -1 : 1)
//     })
//   })
// }

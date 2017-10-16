import { wait } from '@/config/api'
import userList from '@/mocks/userList'

let users = userList
const promiseTimeout = 2000

export const getUserById = (id) => {
  return wait(promiseTimeout).then(() => {
    return users.find((user) => user.id === id)
  })
}

export const getUsers = () => {
  return wait(0).then(() => {
    return users
  })
}

export const addUser = (user) => {
  return wait(promiseTimeout).then(() => {
    users.push(user)

    return users
  })
}

export const updateUserById = (id) => {
  // const currentUser = users.find(user => user.id === +id)

}

export default {
  getUsers,
  getUserById,
  addUser,
  updateUserById
}

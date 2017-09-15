import { wait } from '@/config/api'
import userList from '@/mocks/userList'

export const getUserById = (id) => {
  return wait(300).then(() => {
    return userList.find((user) => user.id === id)
  })
}

export const getUsers = () => {
  return wait(4000).then(() => {
    return userList
  })
}

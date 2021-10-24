import makeAddUser from './add-user'
import makeEditUser from './edit-user'
import makeRemoveUser from './remove-user'
import makeListUsers from './list-users'
import makeLoginUser from './login-user'
import makeLogoutUser from './logout-user'
import usersDb from '../data-access'

const addUser = makeAddUser({ usersDb })
const editUser = makeEditUser({ usersDb })
const listUsers = makeListUsers({ usersDb })
const removeUser = makeRemoveUser({ usersDb })
const loginUser = makeLoginUser({ usersDb })
const logoutUser = makeLogoutUser({ usersDb })

const userService = Object.freeze({
  addUser,
  editUser,
  listUsers,
  removeUser,
  loginUser,
  logoutUser
})

export default userService
export { addUser, editUser, listUsers, removeUser, loginUser, logoutUser }
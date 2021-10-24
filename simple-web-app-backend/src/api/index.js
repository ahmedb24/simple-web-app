import {
    addUser,
    editUser,
    listUsers,
    removeUser,
    loginUser,
    logoutUser
  } from '../use-cases'
  import makeDeleteUser from './delete-user'
  import makeGetUsers from './get-users'
  import makePostUser from './post-user'
  import makePatchUser from './patch-user'
  import makeSignInUser from './signin-user'
  import makeSignOutUser from './signout-user'
  import notFound from './not-found'
  
  const deleteUser = makeDeleteUser({ removeUser })
  const getUsers = makeGetUsers({
    listUsers
  })
  const postUser = makePostUser({ addUser })
  const patchUser = makePatchUser({ editUser })
  const signInUser = makeSignInUser({ loginUser })
  const signOutUser = makeSignOutUser({ logoutUser })
  
  const userController = Object.freeze({
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser,
    signInUser,
    signOutUser
  })
  
  export default userController
  export { deleteUser, getUsers, notFound, postUser, patchUser, signInUser }
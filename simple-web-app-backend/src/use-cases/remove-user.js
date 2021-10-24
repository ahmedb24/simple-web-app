import makeUser from '../entities'

export default function makeRemoveUser ({ usersDb }) {
  return async function removeUser ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a user id.')
    }

    const userToDelete = await usersDb.findById({ id })

    if (!userToDelete) {
      return deleteNothing()
    }
    const user = makeUser(userToDelete);
    await usersDb.remove({id: user.getId()})
    return {
      deletedCount: 1,
      message: 'User deleted.'
    }
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: 'User not found, nothing to delete.'
    }
  }
}
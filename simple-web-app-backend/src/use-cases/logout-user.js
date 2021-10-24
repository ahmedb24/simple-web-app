import makeUser from '../entities'

export default function makeLogoutUser ({ usersDb }) {
  return async function logoutUser ({ email, jwt }) {
    if (!email) {
      throw new Error('You must supply an email.')
    }
    
    if (!jwt) {
      throw new Error('You must supply a token.')
    }

    const userFromDB = await usersDb.findByEmail({email})
    if (!userFromDB) {
      return deleteNothing('Invalid user email, nothing to delete.')
    }
    const decodeError = await makeUser(userFromDB).decoded(jwt);
    if (decodeError.error) {
      return deleteNothing(decodeError.error.message)
    }
    
    const logoutResult = await usersDb.logout({email})
    if (logoutResult.deletedCount !== 1) {
      return deleteNothing('')
    }

    return {
      deletedCount: 1,
      message: 'Session deleted.'
    }
  }

  function deleteNothing (msg) {
    return {
      deletedCount: 0,
      message: msg
    }
  }
}
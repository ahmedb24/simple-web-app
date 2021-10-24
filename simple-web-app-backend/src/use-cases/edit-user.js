import makeUser from '../entities'
export default function makeEditUser ({ usersDb }) {
  return async function editUser ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }

    const existing = await usersDb.findById({ id })

    if (!existing) {
      throw new RangeError('User not found.')
    }
    const user = makeUser({ ...existing, ...changes })
    const updated = await usersDb.update({ ...user.store(), password: user.getPassword() })
    return {  ...user.print() }
  }
}
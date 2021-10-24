import makeUser from "../entities"

export default function makeListUsers ({ usersDb }) {
  return async function listUsers ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a post id.')
    }
    const users = await usersDb.findById({
      id
    })
    const user = makeUser(users)
    return user.print()
  }
}
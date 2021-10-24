import makeUser from '../entities/'
export default function makeAddUser({ usersDb }) {
  return async function addUser (userInfo) {
    try {
        const user = makeUser(userInfo)
        
        const exists = await usersDb.findById({ id: user.getId() })
        if (exists) {
            return exists
        }
        const result = await usersDb.insert({
            id: user.getId(), ...user.store(), password: user.getPassword()
        })
        return makeUser(result).print();
    } catch (error) {
        throw(error)
    }
  }
}
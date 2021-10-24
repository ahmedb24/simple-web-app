export default function makeUsersDb ({ makeDb }) {
  return Object.freeze({
    findById,
    findSessionById,
    findByEmail,
    insert,
    remove,
    update,
    login,
    logout
  })
  async function findById ({ id: _id }) {
    const db = await makeDb()
 
    const result = await db.collection('users').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function findSessionById ({ email: _email }) {
    const db = await makeDb()
    
    
    const result = await db.collection('sessions').find({ email:_email })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _email: email, ...info } = found[0]
    return { email, ...info }
  }
 
  async function findByEmail ({ email: _email }) {
    const db = await makeDb()
    const result = await db.collection('users').find({ email: _email })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function insert ({ id: _id, ...userInfoFromUser }) {
      const db = await makeDb()
      const result = await db
      .collection('users')
      .insertOne({ _id, ...userInfoFromUser })
      const { _id: id, ...userInfo } = result.ops[0]
      return { id, ...userInfo }
  }

  async function update ({ id: _id, ...userInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('users')
      .updateOne({ _id }, { $set: { ...userInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...userInfo } : null
  }
  async function remove ({ id: _id }) {
    const db = await makeDb()
    return await db.collection('users').deleteOne(
        { _id }
    )        
  }
  async function login ( email, jwt ) {
    const db = await makeDb()
    return await db.collection('sessions').updateOne(
        { email: email }, 
        { $set: { jwt } },
        { upsert: true }
   )        
  }
  async function logout ( {email: _email} ) {
    const db = await makeDb()
    return await db.collection('sessions').deleteOne(
        { email: _email }, 
   )        
  }

}
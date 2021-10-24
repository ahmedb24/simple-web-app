import makeUser from "../entities/";
export default function makeLoginUser({ usersDb }) {
  return async function loginUser({ email, password }) {
    const userFromDb = await usersDb.findByEmail({ email });
    if (!userFromDb) {
      throw new Error("Specified user does not exist");
    }
    
    const user = makeUser(userFromDb);

    if (!user.comparePassword(password)) {
      throw new Error("password mismatch");
    }

    const jwt = user.encoded();


    const result = await usersDb.login(email, jwt);
    return result && result.upsertedCount == 1 || result.modifiedCount == 1 ? { email, jwt, user:user.print() } : null;
  };
}
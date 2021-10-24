export default function makeSignOutUser ({ logoutUser }) {
    return async function signOutUser (httpRequest, res) {
      try {
        const jwt = httpRequest.get('Authorization').slice('Bearer '.length)
        const deleted = await logoutUser({ email: httpRequest.query.email, jwt })
        res.status(deleted.deletedCount === 0 ? 404 : 200).send(deleted);
      } catch (e) {
        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
      }
    }
  }
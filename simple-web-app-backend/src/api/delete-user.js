export default function makeDeleteUser ({ removeUser }) {
    return async function deleteUser (httpRequest, res) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const deleted = await removeUser({ id: httpRequest.query.userId })
        res.status(deleted.deletedCount === 0 ? 404 : 200).send(deleted);
      } catch (e) {
        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
      }
    }
  }
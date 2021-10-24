export default function makePatchUser ({ editUser }) {
    return async function patchUser (httpRequest, res) {
      try {
        const { ...userInfo } = httpRequest.body
        const toEdit = {
          ...userInfo,
          id: httpRequest.query.userId
        }
        const patched = await editUser(toEdit)
        res.status(200).send(patched);
      } catch (e) {
        // TODO: Error logging
        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
      }
    }
  }
export default function makeGetUsers ({ listUsers }) {
    return async function getUsers (httpRequest, res) {
      try {
        const getUsers = await listUsers({
          id: httpRequest.query.userId
        })
        res.status(201).send(getUsers);
      } catch (e) {
        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
      }
    }
  }
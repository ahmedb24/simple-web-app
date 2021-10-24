export default function makePostUser({ addUser }) {
  return async function postUser(httpRequest, res) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { ...userInfo } = httpRequest.body;
      const posted = await addUser({
        ...userInfo,
      });
      res.status(201).send(posted);
    } catch (e) {
        console.log('got', e)
        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
    }
  };
}

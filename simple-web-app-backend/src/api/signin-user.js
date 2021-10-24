export default function makeSignInUser ({ loginUser }) {
    return async function signInUser (httpRequest, res) {
      try {
        const token = await loginUser({
          email: httpRequest.body.email,
          password: httpRequest.body.password
        })
        if (!token) {
          res.status(500).send({});
          return;
        }
        res.status(201).send(token);
      } catch (e) {
        console.log('got', e)

        const error = JSON.stringify({Error: e.message});
        res.status(400).send(error);
      }
    }
  }
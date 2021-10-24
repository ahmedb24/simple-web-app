import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";

function Login() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user, isLogin }, dispatch] = useStateValue();

  const signInUser = async (e) => {
    const data = {
      email,
      password,
    };
    return axios.post(`${process.env.REACT_APP_BASEURL}/api/users/login`, data);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await signInUser();
      const userInfo = {token:resp.data.jwt,...resp.data.user}
      dispatch({type: 'SET_USER', user: userInfo})
      history.push("/");
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (err) {
      if (err.response.data) {
        alert(JSON.stringify(err.response.data));
      }
    }
  };

  const createUser = () => {
    const data = {
      name,
      age,
      phone,
      email,
      password,
    };
    return axios.post(
      `${process.env.REACT_APP_BASEURL}/api/users/register `,
      data
    );
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const resp = await createUser();
      dispatch({ type: "SET_ISLOGIN", isLogin: true });
    } catch (err) {
      if (err.response.data) {
        alert(JSON.stringify(err.response.data));
      }
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>{isLogin ? "Sign-in" : "Create an Account"}</h1>

        <form>
          {!isLogin && (
            <label about="Name">
              <h5>Name</h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          {!isLogin && (
            <label about="Age">
              <h5>Age</h5>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          )}
          {!isLogin && (
            <label about="Phone">
              <h5>Phone number</h5>
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          )}

          <label about="email">
            <h5>Email</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label about="password">
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {isLogin && (
            <button
              onClick={signIn}
              className="login__signInButton"
              type="submit"
            >
              Sign In
            </button>
          )}
        </form>
        {!isLogin && (
          <button onClick={register} className="login__registerButton">
            Create your Simple App Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;

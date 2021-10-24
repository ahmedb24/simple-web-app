import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Home.css";
import { useStateValue } from "./StateProvider";

function Home() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setUserStateFromLocalStorage();
  }, []);

  const setUserStateFromLocalStorage = () => {
    const userAsString = localStorage.getItem("user");
    const userFromLocalStorage = JSON.parse(userAsString);
    if (userFromLocalStorage) {
      dispatch({ type: "SET_USER", user: userFromLocalStorage });
    }
  };

  if (!user) {
    return "No page";
  }

  const p = []
  return (
    <div className="home">
      <div className="home__container">
          <h1>Your Profile</h1>
          <h2>Hello {user.name}</h2>
          <p>Here's what i know about you</p>
        <div>
          <span className="home__row">Phone number: {user.phone}</span>
          <span className="home__row">Email: {user.email}</span>
          <span className="home__row">Age: {user.age}</span>
        </div>
        {/* <div>
          <p className="home__row">Name: Susan Bakes</p>

        </div> */}
        <div></div>
      </div>
    </div>
  );
}

export default Home;

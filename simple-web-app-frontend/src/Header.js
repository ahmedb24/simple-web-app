import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Header() {
  // eslint-disable-next-line
  var [{ user, isLogin }, dispatch] = useStateValue();
  const history = useHistory();

  const signOutUser = () => {
    return axios.delete(
      `${process.env.REACT_APP_BASEURL}/api/users/logout?email=${user.email}`,
      { headers: {"Authorization" : `Bearer ${user.token}`}}
    );
  };

  const signOut = async () => {
    try {
      const resp = await signOutUser();
      history.push("/login");
      dispatch({type: 'SET_USER', user:null})
      localStorage.setItem('user', null);
    } catch (error) {
      dispatch({type: 'SET_USER', user:null})
      localStorage.setItem('user', null);
      alert(error);
    }
  };
  function handleAuthentication() {
    if (user) {
      signOut();
    }
  }

  function handleCreateAccountLoginToggle() {
    dispatch({ type: "SET_ISLOGIN", isLogin: !isLogin });
  }

  return (
    <div className="header">
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Welcome"}
            </span>
          </div>
        </Link>
        <Link to="/login">
          {!user && (
            <div
              onClick={handleCreateAccountLoginToggle}
              className="header__option"
            >
              <span className="header__optionLineOne">
                {!isLogin
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <span className="header__optionLineTwo">
                {!isLogin ? "Click Here" : "Create Account"}
              </span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;

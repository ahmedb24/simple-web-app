import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home.js"
import Header from "./Header";
import { useStateValue } from './StateProvider';

function App() {
  
  const [{user}, dispatch] = useStateValue()
  
  useEffect(() => {
    setUserStateFromLocalStorage()
  }, [])

  const setUserStateFromLocalStorage = () => {
    const userAsString = localStorage.getItem('user');
    const userFromLocalStorage = JSON.parse(userAsString);
    if (userFromLocalStorage) {
      dispatch({type: 'SET_USER', user: userFromLocalStorage})
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import SignIn from './components/Signin'
import Create from './components/Create';
import Main from './components/Main';
import Verification from './components/Verification';
//import Second from './components/Second';
//import Cookies from 'universal-cookie';


const Home = () => {
  return (
    <div className="main-bg">
      <p className="main-name">hook me up</p>
      <SignIn />
      <button className="create-acc-btn " data-bs-toggle="modal" href="#exampleModalToggle" >
        Get hooked
      </button>
    </div>
  )
}


function App() {




  return (
    <Router>
      <div className="App">



        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/main">
          <Main />
        </Route>

        <Route path="/verification">
          <Verification />
        </Route>

        <Route path="/create">
          <Create />
        </Route>

      </div>
    </Router>
  );
}

export default App;
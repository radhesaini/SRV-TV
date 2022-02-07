import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from './Components/TopNav/Navigation';
import  SignIn from './Components/Login/SignIn';
import SignUp from './Components/Registration/SignUp';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';

function App(){
  const history = createBrowserHistory();
  var user = localStorage.getItem("user");
  return (<Fragment>
       <Router history={history}>
       <Navigation />
            {user ? <Routes><Route exact path="/dashbord" element={<Home />} /></Routes>:(<Routes><Route exact path="/register" element={<SignUp />} />
            <Route exact path="/login" element={<SignIn />} /></Routes>)}
            {/* <Redirect from="*" to="/" /> */}
      </Router>
  </Fragment>);
};

export default App;
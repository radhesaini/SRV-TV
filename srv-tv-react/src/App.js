import React, {useEffect} from 'react';
import {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from './Components/TopNav/Navigation';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Registration/SignUp';
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Profile from "./Components/Profile/Profile";

import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory} from 'history';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const history = createBrowserHistory();
  const user = localStorage.getItem('user')
  return (
    <Fragment>
      <Router history={history}>
        <Navigation/> {user
          ? <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/home" element={<Home />}/>
                    <Route exact path="/admin" element={<Admin/>}/>
                    <Route exact path="/profile" element={<Profile/>}/>
          </Routes>
          : (
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/register" element={<SignUp />}/>
              <Route exact path="/login" element={< SignIn />}/></Routes>
          )}
        {/* <Redirect from="*" to="/" /> */}
      </Router>
    </Fragment>
  );
};

export default App;
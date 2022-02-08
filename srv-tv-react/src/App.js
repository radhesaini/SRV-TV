import React, {useEffect, useState } from 'react';
import {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Registration/SignUp';
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Profile from "./Components/Profile/Profile";
import Navigation from "./Components/TopNav/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserHistory} from 'history';
import Dashboard from './Dashboard/Dashboard';

function PrivateRoute({ children }) {
  const user =  JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
  }


function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
    <Navigation />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/register" element={<SignUp />}/>
              <Route exact path="/login" element={< SignIn />}/>

          // These are the Private Components
          
            <Route exact path="/home" element={ <PrivateRoute><Home /></PrivateRoute>}/>
                    <Route exact path="/admin" element={ <PrivateRoute><Admin/></PrivateRoute>}/>
                    <Route exact path="/profile" element={ <PrivateRoute><Profile/></PrivateRoute>}/>
                    <Route exact path="*" element={<Dashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
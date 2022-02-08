import React from 'react';
import './Nav.css';
import {Nav} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

function Navigation() {
  var user = localStorage.getItem("user");
  if (user) {
    return (
      <Nav variant="tabs" defaultActiveKey="/home" className="main">
        <h1 className="logo">
          <Link
            to={'/'}
            style={{
            textDecoration: 'none',
            color: '#fff'
          }}>SRV-TV</Link>
        </h1>
        <Nav.Item>
          <Nav.Link to="/home" as={Link} eventkey='link-0'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/admin" as={Link} eventKey="link-1">Admin</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/profile" as={Link} eventKey="link-2">
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/login' eventKey="link-3" onClick={()=>{ localStorage.clear();}}>
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  } else {
    return (
      <Nav variant="tabs" defaultActiveKey="/login" className="main">
        <h1 className="logo">
          <Link
            to={'/'}
            style={{
            textDecoration: 'none',
            color: '#fff'
          }}>SRV-TV</Link>
        </h1>
        <Nav.Item>
          {/* <Link to={'/login'} style={{textDecoration:'none'}}> */}
          <Nav.Link as={Link} to='/login' eventKey="link-4">
            SignIn
          </Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/register' eventKey="link-5">
            SignUp
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}

export default function (props) {
  const navigate = useNavigate();

  return <Navigation {...props} navigate={navigate}/>;
}
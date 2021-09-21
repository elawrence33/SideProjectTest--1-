// Author: Eli Lawrence
// Email: eli.lawrence@catalystcampus.org
// Date: 9/16/2021

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { LOGOUT_SUCCESS } from '../Actions/types';
import swal from 'sweetalert';

// Imported to allow react to redirect user to a differenct page: 
import { Redirect } from "react-router-dom";

// I made NavBar into an actual function so that I could change the way things are rendered to App.js
// This allows me to also redirect the user to the front login page after they have clicked the 
// logout button

class NavBar extends React.Component {
// const NavBar = () => { // what was here before change

state = { 
  redirect: null
}

// Information on arrow functions: https://www.w3schools.com/js/js_arrow_function.asp 
clearCache = () => { 
  const token = localStorage.clear();
  console.log("This is the clearCache token: " + token);
  this.setState({ redirect: "/"})
}

render() {
  // In between the render and the return is where we can make decisions on what to display: 
  if (this.state.redirect) {
    swal('Successful Logout, come back soon!', {
      className: "green-bg",
    })
    return <Redirect to={this.state.redirect} /> 
  }
  return(
    <div>
    <nav className="navbar navbar-dark navbar-expand-lg navbar-light bg-dark">
    <a className="navbar-brand" href="/Form">Web Database</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/Form">Insert</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Search">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Update">Update</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Delete">Delete</a>
        </li>
        {/* This is specifically used to enable a the capability of creating an account.  */}
        {/* <li class="nav-item">
          <a class="nav-link" href="/createAccount">Create Account</a>
        </li>  */}
        <li className="nav-item"> 
          <button className="logoutButton" onClick={this.clearCache}>Logout</button>
        </li>

      </ul>
      
    </div>
  </nav>
  </div>
  );
              
}
}
  

export default NavBar
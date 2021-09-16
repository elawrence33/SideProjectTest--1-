import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router} from 'react-router-dom';
import swal from 'sweetalert';
import CompanyLogo from './logo.png'

// Imported to allow react to redirect user to a differenct page: 
import { Redirect } from "react-router-dom";

import './App.css';

class Login extends React.Component {

//imported from Schema and saved as strings so you can view in Web App console to see the inputs being stored; also used for Payload//
  state = {
    name: "", 
    email: "", 
    password: "", 
    redirect: null
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    console.log("This is our token from local storage: " + token);
  };
//used for creating payload to send to MongoDB//
  getblogpost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }
//Shows real time input from input boxes//
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  
  };


  submit = (event) => {   
    event.preventDefault();
    
//payload sent to Node.js to be posted in MongoDB//
    const payload = {
      name: this.state.name, 
      email: this.state.email, 
      password: this.state.password
    };

//estabishing connection to Node.js and MongoDB//
    axios({
      url: '/api/Auth',
      method: 'POST',
      data: payload
    })
      .then(response => {
        console.log('Login Successful!');
        this.resetUserInputs();
        localStorage.setItem("token", response.data.token);
        swal('Login Successful!', {
          className: "green-bg",
        })
        // Rerouting the user to the homepage. 
        this.setState({ redirect: "/Form" })
      })
      .catch(() => {
        swal('Invalid credentials!' ,{
          className: "red-bg",
        });
        console.log('Internal server error');
      });;

  };

  resetUserInputs = () => {
    this.setState({
      name: '', 
      email: '', 
      password: '', 
    });
  };
  render() {


    // This is used to redirect the user to the homepage only if the 
    // sate has changed to the '/' route. 
    if (this.state.redirect) { 
      return <Redirect to={this.state.redirect} /> 
    }

    console.log('State: ', this.state);
    //JSX
    return(
 
<Router>
    <div>
    
      {/* inputs for payload to be sent to DB */}
      <div className="app">
      <img className="photo" src= {CompanyLogo}></img>
     
        <h1 className="header1">Please Login:</h1>
        <br></br>
        <form onSubmit={this.submit}>
         {/* input text box's for needed payload */}
          <div className="form-input">
            <input 
              type="text"
              name="name"
              placeholder="Enter first and last name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
  
          <div className="form-input">
            <input 
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
         
          <div className="form-input">
            <input 
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <button onClick={this.submit}>Submit</button>
          
        </form>
        
      
</div>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
      </div>
      </Router>
    
    );
  
  }
 
}

export default Login;
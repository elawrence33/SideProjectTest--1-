import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './Components/navbar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { loadUser } from './Actions/authActions'

import './App.css';
//functions or classes need to render pages
import Form from './form';
import Search from './Search';
import Update from './update';
import Delete from './delete';
import Register from './createAccount';
import Login from './login';
import Footer from './Components/Footer';

const loginStatus = localStorage.getItem("LoginStatus"); 

// TIP: ****You can hide the NavBar from view within the login route simply by adding <div> statements****

class App extends React.Component {
  state = { 
    loggedin: loginStatus
  }

render() {
  return (
    
  <div id="appRoot">
    <Router>
            <Switch>
              
              <Route exact path='/' component={Login}></Route>
              
              <div>
                <NavBar />
                <Route exact path='/Form' component={Form}></Route>
                <Route exact path='/Search' component={Search}></Route>
                <Route exact path='/Update' component={Update}></Route>
                <Route exact path='/Delete' component={Delete}></Route>
                <Footer /> 

                {/* <Route exact path='/createAccount' component={Register}></Route> */}
              </div>
            </Switch>
    </Router>
    
  </div>

  )
}
}





export default App;
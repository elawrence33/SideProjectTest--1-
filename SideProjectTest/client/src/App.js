import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './Components/navbar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';





import './App.css';
//functions or classes need to render pages
import Form from './form';
import Search from './Search';
import Update from './update';
import Delete from './delete';
import Footer from './Components/Footer';


class App extends React.Component {
render() {
  return (
    
  <div id="appRoot">
    <Router>
      <NavBar />
            <Switch>
              <Route exact path='/' component={Form}></Route>
              <Route exact path='/Search' component={Search}></Route>
              <Route exact path='/Update' component={Update}></Route>
              <Route exact path='/Delete' component={Delete}></Route>
            </Switch>
            
    </Router>
    
  </div>

  )
}
}





export default App;
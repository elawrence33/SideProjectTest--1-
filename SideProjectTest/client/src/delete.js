import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert';
import CompanyLogo from './logo.png'

import './App.css';


class Delete extends React.Component {

  //message that info has been sent, need to reconfigure incase the entry is a duplicate.
onButtonCLickHandler = () => {
  

}
//imported from Schema and saved as strings so you can view in Web App console to see the inputs being stored; also used for Payload//
  state = {
    smallBusiness: '',
    justTitles: [],
    // used to grab all of the data from the database:
    posts: [], 
    // Used to hold the unique id that will be assigned automatically and randomly within MongoDB:
    
  };

  componentDidMount = () => {
    this.getblogpost();
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
      smallBusiness: this.state.smallBusiness
    };

//estabishing connection to Node.js and MongoDB//
    axios({
        url: '/api/delete',
        method: 'DELETE',
        data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getblogpost();
        this.setState({ smallBusiness: "" });
        swal('Document has been deleted', {
          className: "green-bg",
        })
      })
      .catch(() => {
        swal('An error occured and the document was not deleted' ,{
          className: "red-bg",
        }); 
        console.log('Internal server error');
      });;
    
  };

  resetUserInputs = () => {
    this.setState({
      smallBusiness: '',
      address: '',
      website: '',
      companyTech: '',
      poc: '',
      emailinfo: '',
      phoneinfo:'',
      titleSTTR:'',
      descripSTTR: '',
      princInv: '',
      businessSplit: '',
      cctiSplit: '',
      cctiprovide: '',
      mou: '',
      nda: '',
      ipADD: '',
      cycleSubmit: '',
      topicID: '',
      sttrID: '',
      phaseType: '',
      stateOfProject: '',
    });
  };
  titles = (posts, justTitles) => { 
    posts.map((post, index) => ( 
      justTitles[index] = post.smallBusiness
    ));
    var options = []; 
    options[0] = ""
    for (var i = 0; i < justTitles.length; i++) { 
      options[i] = { value: justTitles[i], label: justTitles[i] }
      
    }
    return options
    
  };
  displayTitles(state) { 
      return (
        this.titles(this.state.posts, this.state.justTitles).map((options) => (
            <option value={options.value}>{options.label}</option>
        ))
      )
  };
  render() {

    console.log('State: ', this.state);

    

    //JSX
    return(
 

    <div>
  
 
      {/* inputs for payload to be sent to DB */}
      <div className="app">
      <img className="photo" src= {CompanyLogo}></img>

     
        <h1 className="header1">Delete a Document by Business Name:</h1>
        <br></br>
        <form onSubmit={this.submit}>
         {/* input text box's for needed payload */}
          <div className="form-input"> 
            <h3>Select Your Business Name:</h3>
            <select value={this.state.smallBusiness} name="smallBusiness" onChange={this.handleChange}>
                {this.displayTitles(this.state)}
            </select>
          </div>
          <button onClick={this.submit}>Delete</button>
        </form>
      
      </div>
   
    </div>
    
    
    );
  
  }
 
}

export default Delete;
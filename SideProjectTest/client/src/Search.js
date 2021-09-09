import React from 'react';
import axios from 'axios';

// This was an important Select component that looked nicer but was unable to pull data from it: 
// import Select from "react-dropdown-select";

import './App.css';
import CompanyLogo from './logo.png'

// Below is a list of options for the hard coded dropdown menus: 
const mouOptions = [
  { value: "None", label: "None"},
  { value: "Signed/Completed", label: "Signed/Completed"},
  { value: "Sent to Business", label: "Sent to Business"}, 
  { value: "Recieved", label: "Recieved"}
  
]

const ndaOptions = [
  { value: "None", label: "None"},
  { value: "Signed/Completed", label: "Signed/Completed"},
  { value: "Sent to Business", label: "Sent to Business"}, 
  { value: "Recieved", label: "Recieved"}, 
]

const ipOptions = [
  { value: "None", label: "None"},
  { value: "Signed/Completed", label: "Signed/Completed"},
  { value: "Sent to Business", label: "Sent to Business"}, 
  { value: "Recieved", label: "Recieved"},
]

const phaseOptions = [
  { value: "None", label: "None"}, 
  { value: "Phase 1", label: "Phase 1"}, 
  { value: "Phase 2", label: "Phase 2"}, 
  { value: "Phase 3", label: "Phase 3"}

]

const stateOptions = [ 
  {
    label: "None",
    value: "None",
  },
  {
    label: "On Going",
    value: "On Going",
  },
  {
    label: "Submitted",
    value: "Submitted",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Shaping",
    value: "Shaping",
  },
  {
    label: "Awarded",
    value: "Awarded",
  }
]

const criteriaOptions = [
  {value: "None", label: "None"}, 
  {value: "Business Name", label: "Business Name"}, 
  {value: "MOU", label: "MOU"}, 
  {value: "NDA", label: "NDA"}, 
  {value: "IP", label: "IP"}, 
  {value: "Phase", label: "Phase"}, 
  {value: "State of Project", label: "State of Project"}
]

class Search extends React.Component {


  state = {
    title: '',
    value: '', 
    posts: [],
    // This only pulls the small business names for a dynamic view of what businesses are added to the database: 
    justTitles: [],
    justMous: [],
    justNda: [], 
    justIp: [], 
    justPhase: [], 
    justState: [],
    criteria: '', 
    smallBusiness: '',
    mou: '', 
    nda: '', 
    ip: '', 
    phase: '', 
    stateOfProject: '',
    query: []
  };

  
  
// This function will dynamically add the group titles to the dropdown menu so that when new groups are added that will
// pupulate in the dopdown. This is achieved by passing the posts array and an array with just titles into the function
// and returning the individual titles to the option array. Finally we simply pass this to the option array and return it
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

  componentDidMount = () => {  
    this.getBlogPost();
  }
  handleChange1 = ({ target }) => { 
    const { name, value } = target;
    this.setState({ [name]: value })
    this.resertUserInputs()
  };

  handleChange = ({ target }) => { 
    const { name, value } = target;
    this.setState({ [name]: value })
  };
  // retrieves the posts from the /api route in the api.js file
  getBlogPost = () => { 
    axios.get('/api')
      .then((response) => { 
        const data = response.data;
        this.setState({ posts: data })
        console.log("Data has been recieved!!");
      })
      .catch(() => { 
        alert('Error retrieving data!!');
      })
  }

  // Used to submit data to the database
  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
      smallbusiness: this.state.smallBusiness,
      mou: this.state.mou,
      nda: this.state.nda, 
      ip: this.state.ip, 
      phase: this.state.phase, 
      stateOfProject: this.state.stateOfProject
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resertUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  }

  displayBlogPost = (posts) => { 
    if (!posts.length) return null; 

    return posts.map((post, index) => ( 
      <div key={index} className=' t_display'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
      
    ));
  };

  displayTitles(posts) { 
    if (!posts.length) return null; 

    return posts.map((post, index) => ( 
      <div className=' t_display'>
        <options>{post.title}</options>
      </div>
    ));
  };

  resertUserInputs = () => {
    this.setState({
      value: ''
    });
  };

  justMous = (posts, justMous) => { 
    posts.map((post, index) => ( 
      justMous[index] = post.mou
    ));
    var options = []; 
    for (var i = 0; i < justMous.length; i++) { 
      options[i] = { value: justMous[i], label: justMous[i] }
      
    }
    return options
    
  };
  justNda = (posts, justNda) => { 
    posts.map((post, index) => ( 
      justNda[index] = post.nda
    ));
    var options = []; 
    for (var i = 0; i < justNda.length; i++) { 
      options[i] = { value: justNda[i], label: justNda[i] }
      
    }
    return options
    
  };
  justIp = (posts, justIp) => { 
    posts.map((post, index) => ( 
      justIp[index] = post.ip
    ));
    var options = []; 
    for (var i = 0; i < justIp.length; i++) { 
      options[i] = { value: justIp[i], label: justIp[i] }
      
    }
    return options
    
  };
  justPhase = (posts, justPhase) => { 
    posts.map((post, index) => ( 
      justPhase[index] = post.phase
    ));
    var options = []; 
    for (var i = 0; i < justPhase.length; i++) { 
      options[i] = { value: justPhase[i], label: justPhase[i] }
      
    }
    return options
    
  };
  justState = (posts, justState) => { 
    posts.map((post, index) => ( 
      justState[index] = post.stateOfProject
    ));
    var options = []; 
    for (var i = 0; i < justState.length; i++) { 
      options[i] = { value: justState[i], label: justState[i] }
      
    }
    return options
    
  };
  displayBusiness(counts, mouBusiness) { 
    return  mouBusiness.map((index) => (
      <li>{index}</li>
    ))
  
  };
  
  displayQuery(state, posts) {  
    // This will denote where in the database the rest of the data should be pulled
    var count; 
    // This will be used to hold more than one index for columns that have duplicates like MOU, NDA, and IP
    var counts = [];
    // This holds the Business Names that correspond to the MOU slected
    var mouBusiness = []
    var ndaBusiness = []
    var ipBusiness = []
    var phaseBusiness = []
    var stateBusiness = []
    const tempBusiness = []
    const tempMou = []
    const tempNda = []
    const tempIp = []
    const tempPhase = []
    const tempState = []

    posts.map((post, index) => ( 
      tempBusiness[index] = post.smallBusiness
    ))
    posts.map((post, index) => ( 
      tempMou[index] = post.mou
    ))
    posts.map((post, index) => ( 
      tempNda[index] = post.nda
    ))
    posts.map((post, index) => ( 
      tempIp[index] = post.ipADD
    ))
    posts.map((post, index) => ( 
      tempPhase[index] = post.phaseType
    ))
    posts.map((post, index) => ( 
      tempState[index] = post.stateOfProject
    ))

    if (state.criteria === "") { 
      return null; 
    }
    else if (state.criteria === "Business Name") { 
      for (var i = 0; i < tempBusiness.length; i++) {
        if (tempBusiness[i] === state.value) {
          count = i; 
        }
      }
      return (
        <div>
          <h2 className="searchcomp">{state.criteria}</h2> 
          <p>{state.value}</p>
          <h2 className="searchcomp">MOU: </h2>
          <p>{tempMou[count]}</p>
          <h2 className="searchcomp">NDA: </h2>
          <p>{tempNda[count]}</p>
          <h2 className="searchcomp">IP: </h2>
          <p>{tempIp[count]}</p>
          <h2 className="searchcomp">Phase: </h2>
          <p>{tempPhase[count]}</p>
          <h2 className="searchcomp">State of Project: </h2>
          <p>{tempState[count]}</p>

          
        </div>
      )
    }
    else if (state.criteria === "MOU") { 
      for (i = 0; i < tempMou.length; i++) {
        if (tempMou[i] === state.value) {
          mouBusiness[i] = tempBusiness[i]
          counts = tempMou[i]
        }
      }
      
      return ( 
        <div>
          <h2 className="searchcomp">Business Names: </h2>
          <ul className=" t__display">{this.displayBusiness(counts, mouBusiness)}</ul>
          <h2>{state.criteria}: </h2>
          <p>{state.value}</p>
        
        </div>
      )
    }
    else if (state.criteria === "NDA") { 
      for (i = 0; i < tempNda.length; i++) {
        if (tempNda[i] === state.value) {
          ndaBusiness[i] = tempBusiness[i]
          counts = tempNda[i]
        }
      }
      return (
        <div> 
          <h2 className="searchcomp">Business Names: </h2>
          <ul className=" t__display">{this.displayBusiness(counts, ndaBusiness)}</ul>
          <h2>{state.criteria}</h2>
          <p>{state.value}</p>
          
        </div>
      )
    }
    else if (state.criteria === "IP") {
      for (i = 0; i < tempIp.length; i++) {
        if (tempIp[i] === state.value) {
          ipBusiness[i] = tempBusiness[i]
          counts = tempIp[i]
        }
      }
      return ( 
        <div>
          <h2 className="searchcomp">Business Names: </h2>
          <ul className=" t__display">{this.displayBusiness(counts, ipBusiness)}</ul>
          <h2>{state.criteria}</h2>
          <p>{state.value}</p>
        </div>
      )
    }
    else if (state.criteria === "Phase") { 
      for (i = 0; i < tempPhase.length; i++) {
        if (tempPhase[i] === state.value) {
          phaseBusiness[i] = tempBusiness[i]
          counts = tempPhase[i]
        }
      }
      return ( 
        <div>
          <h2 className="searchcomp">Business Names: </h2>
          <ul className=" t__display">{this.displayBusiness(counts, phaseBusiness)}</ul>
          <h2>{state.criteria}</h2>
          <p>{state.value}</p>
          
        </div>
      )
    }
    else if (state.criteria === "State of Project") { 
      for (i = 0; i < tempState.length; i++) {
        if (tempState[i] === state.value) {
          stateBusiness[i] = tempBusiness[i]
          counts = tempState[i]
        }
      }
      return ( 
        <div>
          <h2 className="searchcomp">Business Names: </h2>
          <ul className=" t__display">{this.displayBusiness(counts, stateBusiness)}</ul>
          <h2>{state.criteria}</h2>
          <p>{state.value}</p>
        </div>
      )
    }
  }
 
  fieldDropdown = (criteria) => { 
    if (criteria === "") {
      console.log(criteria)
      console.log("No fields selected")
      return ( 
          <option>None</option>
      ) 
    }
    else if (criteria === "Business Name") { 
      return (
          this.titles(this.state.posts, this.state.justTitles).map((option) => (
            <option value={option.value}>{option.label}</option>
          ))
      )
    }
    else if (criteria === "MOU") { 
      return (
        mouOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))
      )
    }
    else if (criteria === "NDA") {
      return (
        ndaOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
         ))
      )
    }
    else if (criteria === "IP") { 
      return (
        ipOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))
        
      )
    }
    else if (criteria === "Phase") { 
      return (
         phaseOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
         ))
      )
    }
    else if (criteria === "State of Project") { 
      return (
        stateOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))
      )
    }
  }

  render() {

    console.log('State: ', this.state);
    //JSX
    
    return(


      <div className="searchbg">
        <img className="photo" src= {CompanyLogo}></img>
        <h1 className="search1" >Search The Catalyst Campus Database</h1>
        <br></br>
        <br></br>

        
        <form>
          <h2 className="search1">Select a Criteria:</h2>
          <div className="dropdown">
            <select value={this.state.criteria} name="criteria" onChange={this.handleChange1}>
              {criteriaOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <h2 className="search1">Select your field: </h2>

          <select value={this.state.value} name="value" onChange={this.handleChange}>
            {this.fieldDropdown(this.state.criteria)}
          </select> 
          <p></p>

        </form>
<br></br>
      <div id="queryResults">
        <h3 className="search2">Your data here: </h3>
        <br></br>
        <ul>
          {this.displayQuery(this.state, this.state.posts)}

        </ul>
      </div>

      </div>

      
    );
   
  }
}

export default Search;
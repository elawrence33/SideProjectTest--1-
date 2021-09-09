import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router} from 'react-router-dom';
import swal from 'sweetalert';

import './App.css';
import CompanyLogo from './logo.png'

///options to use for MOU/NDA/IP
const options = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Signed/Completed",
    value: "Signed/Completed",
  },
  {
    label: "Sent to Business",
    value: "Sent to Business",
  },
  {
    label: "Recieved",
    value: "Recieved",
  }
];
//options for Phases
const options0 = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Phase 1",
    value: "Phase 1",
  },
  {
    label: "Phase 2",
    value: "Phase 2",
  },
  {
    label: "Phase 3",
    value: "Phase 3",
  }
];

const options1 = [
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
];


class Update extends React.Component {

  //message that info has been sent, need to reconfigure incase the entry is a duplicate.
onButtonCLickHandler = () => {
  

}
//imported from Schema and saved as strings so you can view in Web App console to see the inputs being stored; also used for Payload//
  state = { 
    smallBusiness: '',
    smallBusinessTip: '', 
    address: '',
    addressTip: '', 
    website: '',
    websiteTip: '', 
    companyTech: '',
    companyTechTip: '', 
    poc: '',
    pocTip: '', 
    emailinfo: '',
    emailinfoTip: '', 
    phoneinfo:'',
    phoneinfoTip: '',
    titleSTTR:'',
    titleSTTRTip: '', 
    descripSTTR: '',
    descripSTTRTip: '',
    princInv: '',
    princInvTip: '', 
    businessSplit: '',
    businessSplitTip: '',
    cctiSplit: '',
    cctiSplitTip: '', 
    cctiprovide: '',
    cctiprovideTip: '',
    mou: '',
    mouTip: '', 
    nda: '',
    ndaTip: '', 
    ipADD: '',
    ipADDTip: '',
    cycleSubmit: '',
    cycleSubmitTip: '',
    topicID: '',
    topicIDTip: '',
    sttrID: '',
    sttrIDTip: '',
    phaseType: '',
    phaseTypeTip: '',
    stateOfProject: '',
    stateOfProjectTip: '',
    display: [],
    // used to only show the business names within the database. This can be used for a dynamic dropdown list:
    justTitles: [],
    // used to grab all of the data from the database:
    posts: [], 
    // Used to hold the unique id that will be assigned automatically and randomly within MongoDB:
    id: ''
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

  handleChangeID = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.matchNameToId(this.state.smallBusiness, this.state.posts);
    // Test 1 for auto update: 
    this.displayAddress()
    
  };
  // This is how the onChange updates all the states after selecting the business name
  displayAddress() { 
      var tempArray = []; 
      var tempAddress = []; 
      var count; 

      // Need to grab the businesses first
      this.state.posts.map((post, index) => ( 
        tempArray[index] = post.smallBusiness
      ))
      this.state.posts.map((post, index) => ( 
        tempAddress[index] = post.address
      ))
      for (var i = 0; i < tempArray.length; i++) {
        if (this.state.smallBusiness === tempArray[i]) { 
            count = i; 
        }
      }
      this.state.addressTip = tempAddress[count];
      return (
          this.state.addressTip
      )
      
  }
  displayWebsite() { 
    var tempArray = []; 
    var tempWebsite = []; 
    var count; 

    // Need to grab the businesses first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempWebsite[index] = post.website
    ))
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.websiteTip = tempWebsite[count]
    return (
        this.state.websiteTip
    )
  }
  displayCompanyTech() {
    var tempArray = []; 
    var tempCompanyTech = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempCompanyTech[index] = post.companyTech
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.companyTechTip = tempCompanyTech[count]
    return (
        this.state.companyTechTip
    )
  }
  displayPoc() { 
    var tempArray = []; 
    var tempPoc = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempPoc[index] = post.poc
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.pocTip = tempPoc[count]
    return (
        this.state.pocTip
    )
  }
  displayEmail() { 
    var tempArray = []; 
    var tempEmail = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempEmail[index] = post.emailinfo
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.emailinfoTip = tempEmail[count]
    return (
        this.state.emailinfoTip
    )
  }
  displayPhone() { 
    var tempArray = []; 
    var tempPhone = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempPhone[index] = post.phoneinfo
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.phoneinfoTip = tempPhone[count]
    return (
        this.state.phoneinfoTip
    )
  }
  displayTitleSTTR() { 
    var tempArray = []; 
    var tempTitleSTTR = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempTitleSTTR[index] = post.titleSTTR
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.titleSTTRTip = tempTitleSTTR[count]
    return (
        this.state.titleSTTRTip
    )
  }
  displayDescripSTTR() { 
    var tempArray = []; 
    var tempDescripSTTR = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempDescripSTTR[index] = post.descripSTTR
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.descripSTTRTip = tempDescripSTTR[count]
    return (
        this.state.descripSTTRTip
    )
  }
  displayPrincInv() { 
    var tempArray = []; 
    var tempPrincInv = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempPrincInv[index] = post.princInv
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.princInvTip = tempPrincInv[count]
    return (
        this.state.princInvTip
    )
  }
  displayBusinessSplit() { 
    var tempArray = []; 
    var tempBusinessSplit = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempBusinessSplit[index] = post.businessSplit
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.businessSplitTip = tempBusinessSplit[count]
    return (
        this.state.businessSplitTip
    )
  }
  displayCctiSplit() { 
    var tempArray = []; 
    var tempCctiSplit = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempCctiSplit[index] = post.cctiSplit
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.cctiSplitTip = tempCctiSplit[count]
    return (
        this.state.cctiSplitTip
    )
  }
  displayCctiProvide() { 
    var tempArray = []; 
    var tempCctiProvide = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempCctiProvide[index] = post.cctiprovide
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.cctiprovideTip = tempCctiProvide[count]
    return (
        this.state.cctiprovideTip
    )
  }
  displayMou() { 
    var tempArray = []; 
    var tempMou = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempMou[index] = post.mou
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.mouTip = tempMou[count] 
    return (
        this.state.mouTip
    )
  }
  displayNda() { 
    var tempArray = []; 
    var tempNda = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempNda[index] = post.nda
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.ndaTip = tempNda[count]
    return (
        this.state.ndaTip
    )
  }
  displayIpADD() {
    var tempArray = []; 
    var tempIpADD = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempIpADD[index] = post.ipADD
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.ipADDTip = tempIpADD[count]
    return (
        this.state.ipADDTip
    )
  }
  displayCycleSubmit() { 
    var tempArray = []; 
    var tempCycleSubmit = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempCycleSubmit[index] = post.cycleSubmit
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.cycleSubmitTip = tempCycleSubmit[count]
    return (
        this.state.cycleSubmitTip
    )
  }
  displayTopicId() { 
    var tempArray = []; 
    var tempTopicId = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempTopicId[index] = post.topicID
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.topicIDTip = tempTopicId[count]
    return (
        this.state.topicIDTip
    )
  }
  displaySttrId() { 
    var tempArray = []; 
    var tempSttrId = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempSttrId[index] = post.sttrID
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.sttrIDTip = tempSttrId[count]
    return (
        this.state.sttrIDTip
    )
  }
  displayPhaseType() { 
    var tempArray = []; 
    var tempPhaseType = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempPhaseType[index] = post.phaseType
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.phaseTypeTip = tempPhaseType[count]
    return (
        this.state.phaseTypeTip
    )
  }
  displayStateOfProject() {
    var tempArray = []; 
    var tempStateOfProject = []; 
    var count;

    // Need to grab the business first 
    this.state.posts.map((post, index) => ( 
      tempArray[index] = post.smallBusiness
    ))
    this.state.posts.map((post, index) => ( 
      tempStateOfProject[index] = post.stateOfProject
    ))
    // Matching the name to name in the database to find the index number
    for (var i = 0; i < tempArray.length; i++)
      if (this.state.smallBusiness === tempArray[i]) { 
          count = i; 
      }
    this.state.stateOfProjectTip = tempStateOfProject[count]
    return (
      this.state.stateOfProjectTip
    )
  }
  
  matchNameToId(smallBusiness, posts) {
      var tempIds = [];
      var count; 
      var tempNames = [];
      posts.map((post, index) => (
        tempNames[index] = post.smallBusiness
      ));
      posts.map((post, index) => ( 
        tempIds[index] = post.id
      ));
      for (var i = 0; i < tempNames.length; i++) { 
          if (tempNames[i] === this.state.smallBusiness) {
            count = i; 
          }
      }
      this.setState({ id: tempIds[count] })
      
  }


  submit = (event) => {   
    event.preventDefault();
    
//payload sent to Node.js to be posted in MongoDB//
    const payload = {
      smallBusiness: this.state.smallBusiness, 
      address: this.state.address, 
      website: this.state.website, 
      companyTech: this.state.companyTech,
      poc: this.state.poc,
      emailinfo: this.state.emailinfo,
      phoneinfo: this.state.phoneinfo,
      titleSTTR: this.state.titleSTTR,
      descripSTTR: this.state.descripSTTR,
      princInv: this.state.princInv,
      businessSplit: this.state.businessSplit, 
      cctiSplit: this.state.cctiSplit,
      cctiprovide: this.state.cctiprovide,
      mou: this.state.mou,
      nda: this.state.nda,
      ipADD: this.state.ipADD,
      cycleSubmit: this.state.cycleSubmit,
      topicID: this.state.topicID,
      sttrID: this.state.sttrID, 
      phaseType: this.state.phaseType,
      stateOfProject: this.state.project
  
    };
    
    if (payload.address === '') { 
      payload.address = this.state.addressTip;
    }
    if (payload.website === '') { 
      payload.website = this.state.websiteTip;
    }
    if (payload.companyTech === '') { 
      payload.companyTech = this.state.companyTechTip;
    }
    if (payload.poc === '') { 
      payload.poc = this.state.pocTip; 
    }
    if (payload.emailinfo === '') { 
      payload.emailinfo = this.state.emailinfoTip; 
    }
    if (payload.phoneinfo === '') { 
      payload.phoneinfo = this.state.phoneinfoTip;
    }
    if (payload.titleSTTR === '') { 
      payload.titleSTTR = this.state.titleSTTRTip;
    }
    if (payload.descripSTTR === '') { 
      payload.descripSTTR = this.state.descripSTTRTip;
    }
    if (payload.princInv === '') {
      payload.princInv = this.state.princInv; 
    }
    if (payload.businessSplit === '') { 
      payload.businessSplit = this.businessSplitTip;
    }
    if (payload.cctiSplit === '') { 
      payload.cctiSplit = this.state.cctiSplitTip;
    }
    if (payload.cctiprovide === '') { 
      payload.cctiprovide = this.state.cctiprovideTip;
    }
    if (payload.mou === '') {
      payload.mou = this.state.mouTip;
    }
    if (payload.nda === '') { 
      payload.nda = this.state.ndaTip;
    }
    if (payload.ipADD === '') { 
      payload.ipADD = this.state.ipADD;
    }
    if (payload.cycleSubmit === '') { 
      payload.cycleSubmit = this.state.cycleSubmitTip; 
    }
    if (payload.topicID === '') { 
      payload.topicID = this.state.topicIDTip;
    }
    if (payload.sttrID === '') { 
      payload.sttrID = this.state.sttrIDTip;
    }
    if (payload.phaseType === '') { 
      payload.phaseType = this.state.phaseTypeTip;
    } 
    if (payload.stateOfProject === '') { 
      payload.phaseType = this.state.phaseTypeTip;
    }

//estabishing connection to Node.js and MongoDB//
    axios({
        url: '/api/update',
        method: 'PUT',
        data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getblogpost();
        swal('Information has been sent to Database', {
          className: "green-bg",
        })
      })
      .catch(() => {
        swal('The Information was NOT sent to the Database' ,{
          className: "red-bg",
        });
        console.log('Internal server error');
      });;
    // axios.put('/update', {
    //     id: payload.id,
    //     newBusiness: payload.smallBusiness,
    //     newAddress: payload.address,
    //     newWebsite: payload.website, 
    //     newCompanyTech: payload.companyTech,
    //     newPoc: payload.poc,
    //     newEmailInfo: payload.emailinfo,
    //     newPhoneInfo: payload.phoneinfo,
    //     newTitleSttr: payload.titleSTTR,
    //     newDescripSttr: payload.descripSTTR,
    //     newPrincInv: payload.princInv,
    //     newBusinessSplit: payload.businessSplit,
    //     newCctiSplit: payload.cctiSplit, 
    //     newCctiProvide: payload.cctiprovide,
    //     newMou: payload.mou,
    //     newNda: payload.nda,
    //     newIpAdd: payload.ipADD, 
    //     newCycleSubmit: payload.cycleSubmit, 
    //     newTopicID: payload.topicID,
    //     newSttrId: payload.sttrID,
    //     newPhaseType: payload.phaseType,
    //     newStateOfProject: payload.stateOfProject
        
    // });
    
  };

  resetUserInputs = () => {
    this.setState({
      smallBusiness: '',
      smallBusinessTip: '', 
      address: '',
      addressTip: '', 
      website: '',
      websiteTip: '',
      companyTech: '',
      companyTechTip: '',
      poc: '',
      pocTip: '',
      emailinfo: '',
      emailinfoTip: '',
      phoneinfo:'',
      phoneinfoTip: '',
      titleSTTR:'',
      titleSTTRTip: '',
      descripSTTR: '',
      descripSTTRTip: '',
      princInv: '',
      princInvTip: '',
      businessSplit: '',
      businessSplitTip: '',
      cctiSplit: '',
      cctiSplitTip: '',
      cctiprovide: '',
      cctiprovideTip: '',
      mou: '',
      mouTip: '',
      nda: '',
      ndaTip: '',
      ipADD: '',
      ipADDTip: '',
      cycleSubmit: '',
      cycleSubmitTip: '',
      topicID: '',
      topicIDTip: '',
      sttrID: '',
      sttrIDTip: '',
      phaseType: '',
      phaseTypeTip: '',
      stateOfProject: '',
      stateOfProjectTip: ''
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

      <img className="photo" src={CompanyLogo}/>
     
        <h1 className="header1">Update your Fields: </h1>
        <br></br>
        <form onSubmit={this.submit}>
         {/* input text box's for needed payload */}
          <div className="select-Container1"> 
            <h3 className="header2">First Select Business Name:</h3>
            <select value={this.state.smallBusiness} name="smallBusiness" onChange={this.handleChangeID}>
                {this.displayTitles(this.state)}
            </select>
          </div>
             <br></br>
          <div className="form-input">
          <p className="blog-post__display">Current Value: {this.displayAddress()}</p>
            <input 
              type="text"
              name="address"
              placeholder='Enter Address'
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
            <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayWebsite()}</p>
            <input 
              type="text"
              name="website"
              placeholder="Enter Website"
              value={this.state.website}
              onChange={this.handleChange}
            />
          </div>
            <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayCompanyTech()}</p>
            <textarea
              type="text"
              name="companyTech"
              placeholder="What Technology does the Company have"
              cols="25"
              rows="3"
              value={this.state.companyTech}
              onChange={this.handleChange}
            />
          </div>
            <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayPoc()}</p>
            <input
              type="text"
              name="poc"
              placeholder="Company Point of Contact"
              value={this.state.poc}
              onChange={this.handleChange}
            />
          </div>
            <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayEmail()}</p>
            <input 
              type="text"
              name="emailinfo"
              placeholder="Enter Contact Information (email)"
              value={this.state.emailinfo}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayPhone()}</p>
            <input 
              type="text"
              name="phoneinfo"
              placeholder="Enter Contact Information (Phone)"
              value={this.state.phoneinfo}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayTitleSTTR()}</p>
            <input 
              type="text"
              name="titleSTTR"
              placeholder="Enter the title of the STTR"
              value={this.state.titleSTTR}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayDescripSTTR()}</p>
            <textarea
              placeholder="Enter the Description of the STTR"
              name="descripSTTR"
              cols="25"
              rows="3"
              value={this.state.descripSTTR}
              onChange={this.handleChange}
            >              
            </textarea>
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayPrincInv()}</p>
            <input 
              type="text"
              name="princInv"
              placeholder="Enter the Principal Investigator"
              value={this.state.princInv}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayBusinessSplit()}</p>
            <input 
              type="number"
              name="businessSplit"
              placeholder="Enter in the Business Split"
              value={this.state.businessSplit}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayCctiSplit()}</p>
            <input 
              type="number"
              name="cctiSplit"
              placeholder="What is CCTI's Split"
              value={this.state.cctiSplit}
              onChange={this.handleChange}
            />
          </div>
            <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayCctiProvide()}</p>
            <input 
              type="text"
              name="cctiprovide"
              placeholder="What is CCTI providing"
              value={this.state.cctiprovide}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
         <div style={{clear:"left"}}>
<h3 className="formHeader" >Please Select Status</h3>


        <label style= {{marginLeft:"30%", color:"white"}}>Update Status of MOU</label>
        <p className="blog-post__display1" >Current Value: {this.displayMou()}</p>
          <div id= 'mou'>
          <div className="select-Container">
            <select name="mou" value={this.state.mou} onChange={this.handleChange}>
              {options.map((option) => (
                <option id= "mou" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <label style= {{marginLeft:"30%", color:"white"}}>Select Status of NDA</label>
        <p className="blog-post__display1"> Current Value: {this.displayNda()}</p>
        <div id= 'NDA'>
          <div className="select-Container">
            <select name="nda" value={this.state.nda} onChange={this.handleChange}>
              {options.map((option) => (
                <option id= "NDA" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <label style= {{marginLeft:"30%", color:"white"}}>Select Status of IP</label>
        <p className="blog-post__display1">Current Value: {this.displayIpADD()}</p>
        <div id= 'ipADD'>
          <div className="select-Container">
            <select name="ipADD" value={this.state.ipADD} onChange={this.handleChange}>
              {options.map((option) => (
                <option id= "ipADD" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
       
<br></br>
<label style= {{marginLeft:"30%", color:"white"}}>Date the cycle was submitted</label>
<p className="blog-post__display1">Current Value: {this.displayCycleSubmit()}</p>
        <div className="form-input">
            <input 
              type="date"
              name="cycleSubmit"
              placeholder="Date the cycle was submitted"
              value={this.state.cycleSubmit}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displayTopicId()}</p>
            <input 
              type="text"
              name="topicID"
              placeholder="Enter Topic ID"
              value={this.state.topicID}
              onChange={this.handleChange}
            />
          </div>
                <br></br>
          <div className="form-input">
            <p className="blog-post__display">Current Value: {this.displaySttrId()}</p>
            <input 
              type="text"
              name="sttrID"
              placeholder="Enter STTR ID"
              value={this.state.sttrID}
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <label style= {{marginLeft:"30%", color:"white"}}>Select Phase </label>
          <p className="blog-post__display1">Current Value: {this.displayPhaseType()}</p>
        <div id= 'phaseType'>
          <div className="select-Container">
            <select name="phaseType" value={this.state.phaseType} onChange={this.handleChange}>
              {options0.map((option) => (
                <option id= "phaseType" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
              <br></br>
        <label style= {{marginLeft:"30%", color:"white"}}>Select State of the Project</label>
        <p className="blog-post__display1">Current Value: {this.displayStateOfProject()}</p>
        <div id= 'stateOfProject'>
          <div className="select-Container">
            <select name="stateOfProject" value={this.state.stateOfProject} onChange={this.handleChange}>
              {options1.map((option) => (
                <option id= "stateOfProject" value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <br></br>
          </div>
        </div>
</div>
          <button onClick={this.submit}>Submit</button>
        </form>
        
      
</div>
   
      </div>
    
    
    );
  
  }
 
}

export default Update;
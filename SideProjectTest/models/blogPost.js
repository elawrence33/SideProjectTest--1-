const mongoose = require('mongoose');
var mongo = require('mongodb');


// Schema//
const Schema = mongoose.Schema;
const blogpostSchema = new Schema({
    //Server will warn "unique:true is depreciated" but still works to prevent duplicates//
    smallBusiness: {type: String, required: true, unique : true},
    //making sure Business Name is typed out and not a duplicate in database//
    address: String,
    website: String, 
    companyTech: String, 
    poc: String, 
    emailinfo: String, 
    phoneinfo: String, 
    titleSTTR: String, 
    descripSTTR: String, 
    princInv: String, 
    businessSplit: Number, 
    cctiSplit: Number, 
    cctiprovide: String, 
    mou: String, 
    nda: String, 
    ipADD: String, 
    cycleSubmit: String, 
    topicID: String,
    sttrID: {type: String, unique : true},
    //requiring STTR ID to be unique 
    phaseType: String, 
    stateOfProject: String

    
});

// Model//
const blogpost = mongoose.model('client_info', blogpostSchema);
//client_info is the name of the collection inside the database//

module.exports =  blogpost;
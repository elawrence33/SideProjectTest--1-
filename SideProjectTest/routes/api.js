const express = require('express');
const router = express.Router();
const blogpost = require('../models/blogpost');



// Routes used to either get data or post data from(to) MongoDB//

//this route pulls all information from MongoDB, commented out console that display it on server side//
router.get('/', (req, res) => {

    blogpost.find({  })
        .then((data) => {
            //console.log('Data: ', data);//
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

//.post is used to post the payload to the MongoDB 
router.post('/save', (req, res) => {
    const data = req.body;

        const newblogpost = new blogpost(data);

        newblogpost.save((error) => {
            if (error){
                res.status(500).json({msg: 'Sorry Internal Server Error'});
                return;
            }else
            return res.json({
                msg:('Your data has been saved to the database')
            });
        })
});


router.put('/update', (req, res) => { 
    const Business = req.body.smallBusiness
    const newAddress = req.body.address 
    const newWebsite = req.body.website 
    const newCompanyTech = req.body.companyTech 
    const newPoc = req.body.poc
    const newEmailInfo = req.body.emailinfo
    const newPhoneInfo = req.body.phoneinfo
    const newTitleSttr = req.body.titleSTTR
    const newDescripSttr = req.body.descripSTTR
    const newPrincInv = req.body.princInv
    const newBusinessSplit = req.body.businessSplit
    const newCctiSplit = req.body.cctiSplit
    const newCctiProvide = req.body.cctiprovide
    const newMou = req.body.mou
    const newNda = req.body.nda
    const newIpAdd = req.body.ipADD
    const newCycleSubmit = req.body.cycleSubmit
    const newTopicID = req.body.topicID
    const newSttrId = req.body.sttrID
    const newPhaseType = req.body.phaseType
    const newStateOfProject = req.body.stateOfProject
    const filter = {smallBusiness: Business}
    const update = {
        address: newAddress,
        website: newWebsite, 
        companyTech: newCompanyTech,
        poc: newPoc,
        emailinfo: newEmailInfo,
        phoneinfo: newPhoneInfo, 
        titleSTTR: newTitleSttr,
        descripSTTR: newDescripSttr,
        princInv: newPrincInv,
        businessSplit: newBusinessSplit,
        cctiSplit: newCctiSplit,
        cctiprovide: newCctiProvide,
        mou: newMou,
        nda: newNda,
        ipADD: newIpAdd,
        cycleSubmit: newCycleSubmit,
        topicID: newTopicID,
        sttrID: newSttrId,
        phaseType: newPhaseType,
        stateOfProject: newStateOfProject
    }

    try { 
        // This is our second attempt using the findOneAndUpdate function. This make it where we do
        // not need to find the ID field. 
        blogpost.findOneAndUpdate(filter, update)
        .then((data) => {
            console.log('Debug statement => Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    } catch (err) { 
        console.log(err)
    }
    res.send('Updated!');
});

// This route is used to delete the entire entry: 
router.delete('/delete', (req, res) => {
    // This gets the business name for the query: 
    var Business = req.body.smallBusiness
    // This is used to find the document first, then deletes that specific document: 
    var myQuery = { smallBusiness: Business };
   
    // This function finds a document with the specified business name and delets the entire entry. 
    // The function looks different from the other function above as this was the only delete function
    // that I found that would work: 
    blogpost.deleteOne(myQuery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send("Document Deleted"); 
    }); 
});

// blank route for testing
router.route('/name', (req, res) => {
      
    
});



module.exports = router;
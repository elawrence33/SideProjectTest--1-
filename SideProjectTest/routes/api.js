const express = require('express');
const router = express.Router();
const blogpost = require('../models/blogpost');
const users = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
// Imported to encrypt messages to the database: 
const bcrypt = require('bcryptjs');
// Imported to require authentication to use routes: 
const auth = require('../middleware/auth');


// *****IMPORTANT*****
// To turn these into private routes you must put "auth," after the round to require an json web token.

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
// The second argument ***auth*** is used to run middleware:
router.post('/save', auth, (req, res) => {
    const data = req.body;
    // Reordering the data into payload: 
    const payload = { 
      smallBusiness: data.smallBusiness, 
      address: data.address, 
      website: data.website, 
      companyTech: data.companyTech,
      poc: data.poc,
      emailinfo: data.emailinfo,
      phoneinfo: data.phoneinfo,
      titleSTTR: data.titleSTTR,
      descripSTTR: data.descripSTTR,
      princInv: data.princInv,
      businessSplit: data.businessSplit, 
      cctiSplit: data.cctiSplit,
      cctiprovide: data.cctiprovide,
      mou: data.mou,
      nda: data.nda,
      ipADD: data.ipADD,
      cycleSubmit: data.cycleSubmit,
      topicID: data.topicID,
      sttrID: data.sttrID, 
      phaseType: data.phaseType,
      stateOfProject: data.project, 
    }

        const newblogpost = new blogpost(payload);

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


router.put('/update', auth, (req, res) => { 
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
     
        // This is our second attempt using the findOneAndUpdate function. This make it where we do
        // not need to find the ID field. 
        blogpost.findOneAndUpdate(filter, update)
        .then((data) => {
            console.log('Debug statement => Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            return res.status(500).json({ msg: 'Could not update'})
        });
    
});

// This route is used to delete the entire entry: 
router.delete('/delete', auth, (req, res) => {
    // This gets the business name for the query: 
    var Business = req.body.smallBusiness
    // This is used to find the document first, then we will delete that specific document: 
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

// This route is used to get user information for logging in: 
router.get('/users', (req, res) => {
      res.send("Recieved user information!");
});
// This route is used to register with the Users collectino in the ccti_db database
router.post('/register', (req, res) => {
    const { name, email, password } = req.body; 

    
    // Simple validation
    if (!name || !email || !password) { 
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    
    // Check for existing user: 
    users.findOne({ email }) // We are looking for an email that equals the email, since they are the same we only need one
        .then(user => { 
            if (user) return res.status(400).json({ msg: 'User already exists'});     
            const newUser = new users({ 
                name, 
                email, 
                password
            });

            // Creating salt and hash: 
            bcrypt.genSalt(10, (err, salt) => { 
                bcrypt.hash(newUser.password, salt, (err, hash) => { 
                   if (err) throw err; 
                   // Saving the new password as the hashed password: 
                   newUser.password = hash; 
                   newUser.save()
                    .then(user => { 
                        // Creating json web token:
                        jwt.sign(
                           { id: user.id }, 
                           config.get('jwtSecret'), 
                           { expiresIn: 3600 }, 
                           (err, token) => { 
                               if (err) throw err; 
                               res.json({
                                token,
                                user: { 
                                    id: user.id, 
                                    name: user.name, 
                                    email: user.email
                                }
                            });
                           }
                        )
                    });
                   
                })
            })
        })
});

router.post('/Auth', (req, res) => {
    const { name, email, password } = req.body; 
    var Token;

    // Simple validation
    if (!name || !email || !password) { 
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user: 
    users.findOne({ email }) // We are looking for an email that equals the email, since they are the same we only need one
        .then(user => { 
            console.log("Here is the user: " + user); 
            if (!user) return res.status(400).json({ msg: 'User does not exist'});
            
            // Validate password: 
            // We can use the compare method in the bycrypt class
            bcrypt.compare(password, user.password)
                .then(isMatch => { 
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials'}); 

                    jwt.sign(
                        { id: user.id }, 
                        config.get('jwtSecret'), 
                        { expiresIn: 3600 }, 
                        (err, token) => { 
                            if (err) throw err; 
                            res.json({
                             token,
                             user: { 
                                 id: user.id, 
                                 name: user.name, 
                                 email: user.email
                             }
                         });
                        
                         
                        }
                     )
                })

        })
    
});

router.put('/update-auth', (req, res) => { 
    const { email, password } = req.body; 
    var newPass = req.body.password;
    const filter = {email: email}; 
    

    // Simple validation
    if (!email || !password) { 
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user: 
    users.findOne({ email }) // We are looking for an email that equals the email, since they are the same we only need one
        .then(user => { 
            console.log("Here is the user: " + user); 
            if (!user) return res.status(400).json({ msg: 'User does not exist'});
        });

            bcrypt.genSalt(10, (err, salt) => { 
                bcrypt.hash(newPass, salt, (err, hash) => { 
                   if (err) throw err;
                    
                    // Updating the new password with the hashed version:
                    newPass = hash; 
                    const update = newPass;
                    users.updateOne(filter, {$set: {password: update }})
                    .then((data) => {
                        // We need to re-issue a token to the user:
                        users.findOne({ email })
                        .then(user => {
                            if (!user) return res.status(400).json({ msg: 'User does not exist'});
                            jwt.sign(
                                { id: user.id }, 
                                config.get('jwtSecret'), 
                                { expiresIn: 3600 }, 
                                (err, token) => { 
                                    if (err) throw err; 
                                    res.json({
                                    token,
                                    user: { 
                                        id: user.id, 
                                        name: user.name, 
                                        email: user.email
                                    }
                                    });
                                }
                            )
                        })
                        // res.json(data);
                    })
                    .catch((error) => {
                        return res.status(500).json({ msg: 'Could not update, need a valid account!'})
                    });
                });
            });
            
});

// This route is used to get a single users information exluding the password: 
router.get('/user', auth, (req, res) => { 
    users.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;
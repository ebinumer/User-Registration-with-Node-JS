const multiparty = require('multiparty');
const dbUtil    = require('../config/db');



exports.indexFunction = (req,res) => {

    try {        
        dbUtil.getDB().createCollection("user", function(err, response) {
            if (err) res.status(200).send(err.message);
            else res.status(200).send('successfully completed index API');
          });
    } catch (error) {
        res.status(500).send('Failed to completed index API'); 
    }
}

//get all registered users also have search option
exports.getProfile = (req,res) => {
    var query = { name: req.body.search };
    try {
        dbUtil.getDB().collection("user").find("na").toArray(function(err, result_data) {
            if (err) res.status(200).send(err.message);
            else res.status(200).json({ message: 'Successfully listing all users',status_code:200,status:true,users:result_data }); 
          });

    } catch (error) {
        res.status(500).send('Failed to completed get Profile API'); 
        console.log(error)
    }
}

//register api with username , email, password
exports.registerUsers = (req,res) => {
    try {
        const note = { name: req.body.name, email: req.body.email, password: req.body.password };
        var query = { email: req.body.email };
        dbUtil.getDB().collection("user").find(query).toArray(function(err, result_data) {
            if (err) res.status(200).send(err.message);
        else{
            console.log(result_data,result_data.length);
            if(note.name == undefined){
                res.status(200).json({ message: `Please Insert Username`,status_code:200,status:false });
            }
            else if(note.email == undefined){
                res.status(200).json({ message: `Please Insert Email`,status_code:200,status:false });
            }
            else if(note.password == undefined){
                res.status(200).json({ message: `Please Insert Password`,status_code:200,status:false });
            }
           else if(result_data.length != 0){
                res.status(200).json({ message: `Email already exist`,status_code:200,status:false });
            }
            else{
               
                dbUtil.getDB().collection("user").insertOne(note, function(err, result) {
                    if (err) res.status(200).send(err.message);
                    else res.status(200).json({ message: 'Successfully added new user',status_code:200,status:true,user:note }); 
                  });

            }
        }
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed Profile API', error: error.message }); 
    }
}

//login api with email and password
exports.LoginUser = (req,res) => {
    try {
        const userDetails = {email: req.body.email, password: req.body.password };
        dbUtil.getDB().collection("user").find(userDetails).toArray(function(err, result_data) {
            if (err) res.status(200).send(err.message);
        else{
            if(userDetails.email == undefined){
                res.status(200).json({ message: `Please Enter Email`,status_code:200,status:false });
            }
            else if(userDetails.password == undefined){
                res.status(200).json({ message: `Please Enter Password`,status_code:200,status:false });
            }
           else if(result_data.length == 0){
                res.status(200).json({ message: `Email or password mismatch `,status_code:200,status:false });
            }
            else{
               
                res.status(200).json({ message: `Successfully logged in `,status_code:200,status:false,data:result_data });

            }
        }
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed Login API', error: error.message }); 
    }
}

exports.uploadUserDetails = (req,res) => {
    try {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            console.log(fields, files);
            res.status(200).json({ message: `successfully completed Profile API ${fields.id}` });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed Profile API', error: error.message }); 
    }
}


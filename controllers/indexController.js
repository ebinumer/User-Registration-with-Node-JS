const multiparty = require('multiparty');
const dbUtil    = require('../config/db');
const jwt = require('jsonwebtoken');




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
    var query = { name: req.query.search };
    let { limit,offset,search } =  req.query;
    console.log(req.query);
    const search_query = { name: { $regex:search} };
    // sort in descending (-1) order by length
const sort = { length: 1 };
let n_limit = limit ? parseInt(limit) :0;
let n_offset = offset ? parseInt(offset) : 0 ;
const skip = 0;
    try {
        dbUtil.getDB().collection("user").find(search_query).limit(n_limit).skip(n_limit*n_offset).toArray(function(err, result_data) {
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
        const inputData = { name: req.body.name, email: req.body.email, password: req.body.password ,token:""};
        var query = { email: req.body.email };
        let { email } =  req.body;
        let message = inputData.name ? 
                (inputData.email ? 
                (inputData.password ? 
                `` 
                : `Please Insert Password`) 
                : `Please Insert Email` )
                : `Please Insert Username`
        if(message === ''){
            dbUtil.getDB().collection("user").find(query).toArray(function(err, result_data) {
                if (err) res.status(200).send(err.message);
                else if(result_data.length !== 0)  
                res.status(401).json({ message: 'User already exists!',status_code:200,status:false });
            
                else{
                        const token = jwt.sign({ email: email?.toString()}, process.env.JWT_SECRET)
                        console.log("token",token);
                        inputData.token = token
                        console.log("inputData",inputData);
                        dbUtil.getDB().collection("user").insertOne(inputData, function(err, result) {
                            if (err) res.status(200).send(err.message);
                            else res.status(200).json({ message: 'Successfully added new user',status_code:200,status:true,user:inputData }); 
                        }); 
                }
            });
        }else{
            res.status(401).json({ message: message,status_code:200,status:false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed Profile API', error: error.message }); 
    }
}

//login api with email and password
exports.LoginUser = (req,res) => {
    try {
        const userDetails = {email: req.body.email, password: req.body.password };
        let message = userDetails.email ? 
        (userDetails.password ? 
        `` 
        : `Please Insert Password`) 
        : `Please Insert Email` 

        if(message == ''){
            dbUtil.getDB().collection("user").find(userDetails).toArray(function(err, result_data) {
                if (err) res.status(200).send(err.message);
            else{
               if(result_data.length == 0){
                    res.status(200).json({ message: `Email or password mismatch `,status_code:200,status:false });
                }
                else{
                     res.status(200).json({ message: `Successfully logged in `,status_code:200,status:true,data:result_data[0] });
                }
            }
            });
        }
        else{
            res.status(401).json({ message: message,status_code:200,status:false }); 
        }

       
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed Login API', error: error.message }); 
    }
}
 
exports.uploadUserDetails = (req,res) => {
    try {
        const form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            console.log("field = ",fields,"file = ", files);
        
           const match = ["image/png", "image/jpeg"];
           res.json({files})
                
            // res.status(200).json({ message: `successfully completed upload user details API ` });
        });
         
    } catch (error) {
        res.status(500).json({ message: 'Failed to completed upload user details API', error: error.message }); 
    }
}

exports.deleteUser = (req,res) => {
    const query = { "email": req.body.email };
    try {        
        dbUtil.getDB().collection("user").deleteOne(query)
        .then(result => console.log(`Successfully Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    } catch (error) {
        res.status(500).send('Failed to completed index API'); 
    }
}


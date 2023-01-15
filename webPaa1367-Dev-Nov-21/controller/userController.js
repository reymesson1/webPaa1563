var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var bcrypt = require('bcrypt-nodejs');

exports.setRegister = async(req,res)=>{
    
    var userData = req.body;

    var user = new User({
        "username":userData.username
    })
    bcrypt.hash(userData.password, null, null, (err, hash)=>{                   
        user.password = hash;          
    })
    user.save(function(err){
        if(!err){
            console.log('User saved');
        }
    })
}

exports.setLoginIpad = async(req,res)=>{

    let obj = req.body;

    res.setHeader("Content-Type", "application/json");


    console.log(obj);

    var userData = obj;
    var user = await User.findOne({username: userData.username.toLowerCase()});

    console.log("user");
    console.log(user);

    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){

            let error = {
                "message": "Email or password invalid"
            }

            console.log('error')

            let data = {
                "error": false,
                "message": "successfully",
                "data": [error]
            }        
    
            return res.status(401).send(data)
            // return res.status(401).send({message: 'Email or Password Invalid - Password'})
        }
        
        var payload = { sub: user._id }
            
        var token = jwt.encode(payload, '123')

        let tokenData = {
            "token": token,
            "sub": user._id
        }

        console.log(token);

        let data = {
            "error": false,
            "message": "successfully",
            "data": [tokenData]
        }        

        console.log(data);

        // res.status(200).send(data)
        // res.send(data)
        // res.setHeader("Content-Type", "application/json");

        res.send(data);


        // res.status(200).send({"token":token});
        // res.status(200).send(req.body)
    })


    // let token = {
    //     "token": "dasd0as0d98a08da0d8d09809a8d09a.8sd"
    // }
    // let error = {
    //     "message": "Email or password invalid"
    // }

    // let data = {
    //     "error": false,
    //     "message": "successfully",
    //     "data": [token]
    // }    

    // let data = {
    //     "error": false,
    //     "message": "successfully",
    //     "data": [
    //         {
    //             "id": "0",
    //             "category": "Bracelets",
    //             "items": []
    //         }
    //     ]
    // }    
  
    // res.send(data)

}

exports.setLogin = async(req,res)=>{

    var obj = req.body; 

    console.log(obj);

    var userData = obj;
    var user = await User.findOne({username: userData.username});

    console.log(!user);

    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }

    console.log(user);
    // console.log(userData);
    
    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){
            return res.status(401).send({message: 'Email or Password Invalid - Password'})
        }
        
        var payload = { sub: user._id }
        
        var token = jwt.encode(payload, '123')

        console.log(token);

        res.status(200).send({"token":token,"sub": user._id});
        // res.status(200).send(req.body)
    })

    // res.status(200).send("test")


}
exports.setResetPassword = async(req,res)=>{
    
    
    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    userObj.author = decode.sub
    
    const ObjectId = mongoose.Types.ObjectId;        
    
    var user = await User.findOne({"_id":ObjectId(userObj.author)},function(err,users){
        if(!err){
            bcrypt.hash(userObj.newpassword, null, null, (err, hash)=>{                   
                users.password = hash;          
            })
            users.save(function(err,user){
                console.log('User saved: ', user);
            })
        }
    })
    
    res.send({"message":"Successfully reset!"})
}

exports.getLogout = async(req,res)=>{
    
    cookies = false;
    res.redirect('/');
}

exports.getUsers = async(req,res)=>{

    var user = await User.find({});

    res.send(user);
}

exports.createUser = async(req,res)=>{

    var newUser =  req.body;

    // let user = new User(newUser);
  
    // console.log(product);

    var user = new User(newUser);
    bcrypt.hash(newUser.password, null, null, (err, hash)=>{                   
        user.password = hash;          
    })
    user.save(function(err){
        if(!err){
            console.log('User saved');
        }
    })
  
    // user.save(function(err){
    //   if(!err){
    //     console.log('User saved');
    //   }else{
    //       console.log(err)
    //   }
    // })
  
    res.send(req.body);
      // var user = await User.findOne({});

    // res.send(user);
}

exports.deleteUser = async(req,res)=>{

    var obj = req.body;
  
    var user = await User.remove({"username":obj.username},function(err,master){
      if(!err){
        console.log("User removed ");
      }
    })
  
    res.send(user);
}
let User = require('../models/user');
let jwt = require('jsonwebtoken');
var token;
exports.register =  (req,res,next) => {    
    res.render('pages/register.ejs');
}

exports.postRegister = (req,res,next) => {
    // console.log(req.body);
    const username = req.body.username;
    const dob = req.body.dob;
    const contact = req.body.contact;
    const job = req.body.job;
    const hours = req.body.hours;
    const issues = req.body.issues;
    const height = req.body.height;
    const weight = req.body.weight;
    const gym = req.body.gym;
    const membership_time= req.body.membership_time;
    var gender = req.body.gender;
    if(gender=='on'){
        gender='Female';
    }
    else{
        gender='Male';
    }
    var preference = req.body.preference;
    if(preference=='on'){
        preference='at home';
    }
    else{
        preference='in gym';
    }
    var mem_type = req.body.mem_type;
    // console.log(mem_type);
    // console.log(gender);
    // console.log(preference);
    // console.log(req.body);
    // username = "apple";   
    const newUser = new User({username,dob,contact,job,hours,issues,height,weight,gym,membership_time,gender,preference,mem_type});
    newUser.save()
      .then(() => {
          console.log('User added!');
          res.redirect('/login');
        })
      .catch(err => res.status(400).json('Error: ' + err));
}

exports.login=(req,res,next)=>{
    if(req.session.username)
    {res.redirect('/');}
    else{
        res.render('pages/login');
    }
}

exports.postlogin=(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    // const windowGlobal = typeof window !== 'undefined' && window;
    User.findOne({username:username})
    .then(user=>{
        // console.log(user,user.job);
        if(user.job === password){
            token= jwt.sign({user:user},'some-secret-key',{expiresIn : "2h"});
            req.session.token = token;
            req.session.username = user.username;
            // console.log("In post login =");
            res.redirect('/');
        }
        else{
            // console.log("User=",user,"Job=",user.job,"Password=",password);
            console.log("User found but incorrect password");
            res.redirect('/login');
        }
        // res.redirect('/login');
    }).catch(err=>{
        console.log(err,"User not found");
        res.redirect('/login');
    });
    // if(user==null){
    // console.log("User not found");
    // res.redirect('/login');
    // }
    // else{
    //     if(user.job === password){
    //         res.render('pages/dashboard');
    //     }
    //     else{
    //         console.log("User=",user,"Job=",user.job,"Password=",password);
    //         console.log("User found but incorrect password");
    //         res.redirect('/login');
    //     }
    // }
}
exports.dashboard = async (req,res,next) =>{
    // var result = ;
    // console.log("In dashboard=",result);
    const user = await User.findOne({username:req.session.username});
        console.log(user);
        if(req.session.username)
        res.render('pages/dashboard',{user:user});
        else{
        console.log("Not logged in");
        res.redirect('/login');}
    
}
exports.logout = (req,res,next) =>{
    req.session.destroy(function(err) {
        // cannot access session here
        // console.log(req.session.username);
        res.redirect('/login');
    })
    
}
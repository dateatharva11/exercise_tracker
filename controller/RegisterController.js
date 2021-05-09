let User = require('../models/user');

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
        gender='female';
    }
    else{
        gender='male';
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
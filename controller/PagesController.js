let Exercises = require('../models/exercises');
let User = require('../models/user');

exports.dashboard = async (req,res,next) =>{
    // console.log("In pagescontroller=",res.locals,req.locals);
    const user = await User.findOne({username:req.session.username});
    res.render('pages/dashboard',{user:user});
}
exports.meals = async (req,res,next) =>{
    const user = await User.findOne({username:req.session.username});
    res.render('pages/meals',{user:user});
}
exports.exercises = async (req,res,next) => {
    const user = await User.findOne({username:req.session.username});
    Exercises.find()
    .then(exercises => {
        // console.log(exercises);
        res.render('pages/exercises',{exercises:exercises,user:user});
    })
    .catch(err=>{
        console.log(err,"error from exercises in PagesController");
    });
}
const calculateperformed = async (current_username) => {
    var performed =[];
    // console.log(req.session.username);
    // var exercises = await Exercises.find();
    await User.findOne({username:current_username})
    .then
    (async user=>{
    // console.log("Length=",user.exercises.length);
    for(var i=0;i<user.exercises.length;i++){
        // console.log("In here");
        await Exercises.findById(user.exercises[i].id).then(temp=>{
            console.log("Temp=",temp);
            temp.calories = user.exercises[i].cal_burnt;
            temp.pdate = user.exercises[i].pdate;
            performed.push(temp);
            // console.log("Temp=",temp.pdate);
            // console.log("Debug=",performed);
        }).catch(err=>{console.log(err,"Error from findbyId exercises")});
    }
    // console.log("Performed=",performed);
    }).catch(err=>{console.log(err,"Error from findone user")});
    return performed;
    // callback ({performed:performed});
}
exports.tasks = async (req,res,next) =>{
    if(req.session.username)
    {
        Exercises.find()
        .then(async exercises => {
            // console.log(exercises);
            var d = new Date();
            var date = d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear();
            User.findOne({username:req.session.username}).then(async user=>{
            
            var p = await calculateperformed(req.session.username);
            // console.log("In tasks exercises=",exercises,"In tasks performed=",p);
            res.render('pages/tasks',{exercises:exercises,today:date,performed:p,user:user});
        })
        })
        .catch(err=>{
            console.log(err,"error from tasks in PagesController");
        });
    }
    else{ res.redirect('/login'); }
}
exports.posttasks = async (req,res,next) =>{
    const name = req.body.ex_name;
    const reps = req.body.reps;
    var d = new Date();
    var date = d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear();
            
    // console.log(req.session.username);
    // console.log("Length of name=",name.length);
    // console.log("Names=",name);
    // console.log("Reps=",reps);
    for (let j = name.length - 1; j >= 0; j--) {
        if (reps[j] == "0" || reps[j]==="" || reps[j].includes("-")) {
          name.splice(j, 1);
          reps.splice(j,1);
        }
      }
    // console.log("names length=",name.length,"reps=",reps);
    for(var i=0;i<name.length;i++)
    {
        var exercise = await Exercises.findOne({name:name[i]});
        // existing_exercises[Object.keys(existing_exercises).length+1] = {id:exercise._id,cal_burnt:(exercise.calories * reps[i])};
    
        console.log(exercise.name);
        User.findOneAndUpdate(
            {username:req.session.username},
            {$push:{
                exercises :
                { 
                    id : exercise._id,
                    cal_burnt : (exercise.calories * reps[i]),
                    pdate : date,
                },
            }}).then(user=>{
                // console.log(user);
                // res.redirect('/tasks');        
            })
            .catch(err=>{
                console.log(err,"Error from posttasks");
            });
    }
    res.redirect('/tasks');
    
}
// Admin
exports.form = async (req,res,next) =>{
    const user = await User.findOne({username:req.session.username});
    
    res.render('pages/exercise_form',{user:user});
}
exports.postaddexercises = (req,res,next) =>{
    const name = req.body.exname;
    const description = req.body.description;
    const calories = req.body.calories;
    const ex_type = req.body.type;
    console.log(name,description,calories,ex_type);
    
    const exercise = new Exercises({name,description,calories,ex_type});
    exercise.save()
      .then(() => {
          console.log('Exercise added!');
          res.redirect('/form');
        })
      .catch(err => res.status(400).json('Error: ' + err));
    // res.render('pages/'); 
    // res.redirect('/form');
}

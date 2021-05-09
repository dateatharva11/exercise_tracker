const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path=require('path');
const RegisterRouter = require('./routes/register.js')
// let User = require('./models/user');

require('dotenv').config();

app.set('view engine','ejs');
app.set('views','views');

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//connect to mongodb
const uri = process.env.URI
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex:true,useUnifiedTopology: true} );
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

//starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

app.use(bodyParser.urlencoded({extended :false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(RegisterRouter);

app.use('/login',(req,res,next)=>{
    res.render('pages/login.ejs');
});

//app.use('/register',RegisterRouter);
// app.use('/postregister',(req,res,next)=>{ 
//     const username = req.body.username;   
//     const newUser = new User({username});
//     newUser.save()
//       .then(() => res.json('User added!'))
//       .catch(err => res.status(400).json('Error: ' + err));
//     res.render('pages/register.ejs');
// });

// app.use('/register',(req,res,next)=>{    
//     res.render('pages/register.ejs');
// });

app.use('/exercises',(req,res,next)=>{
    res.render('pages/exercises.ejs');
});

app.use('/dashboard',(req,res,next)=>{
    res.render('pages/dashboard.ejs');
});
app.use('/',(req,res,next)=>{
    res.render('pages/page.ejs');
});
app.listen(3000);
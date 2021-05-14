const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path=require('path');
const RegisterRouter = require('./routes/register.js')
const PagesRouter = require('./routes/pages');
const session = require('express-session');
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
mongoose.set('useFindAndModify', false);
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
app.use(session({secret:'my-secret',resave:false,saveUninitialized:false}));

app.use(RegisterRouter);
app.use(PagesRouter);
app.use('/login',(req,res,next)=>{
    res.render('pages/login.ejs');
});

app.listen(3000);
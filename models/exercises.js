const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
        name:{
            type:String
        },
        description:{
            type:String
        },
        calories:{
            type: Number
        },
        ex_type:{
            type : String,
            enum : ["Home","Gym","Both"]
        }
});
const Exercises = mongoose.model('Exercises', exerciseSchema);

module.exports = Exercises;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  dob: {
    type: Date
  },
  contact: {
      type: Number
  },
  email: {
      type:String
  },
  job: {
    type:String
  },
  hours: {
    type:Number
  },
  issues: {
    type:String
  },
  gender: {
    type:String
  },
  height: {
    type:Number
  },
  weight: {
    type:Number
  },
  preference: {
    type: String
  },
  gym:{
    type:String
  },
  membership_time:{
    type:Number
  },
  mem_type:{
    type:String
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

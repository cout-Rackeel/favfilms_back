const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_nm : {
    type : String,
    required: [true , 'Your first name is required']
  },
  last_nm : {
    type : String,
    required: [true , 'Your last name is required']
  },
  username:{
    type:String,
    required:[true, 'Your username is required'],
    unique:[true , 'This username is taken']
  },
  email : {
    type : String,
    required: [true , 'Your email address is required']
  },
  password : {
    type : String,
    required : [true , 'Your password is required']
  },
  favourites : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Movie',
    sparse: true
  }]
}, {collection:'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;
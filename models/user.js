const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
  password: {
    type: String,
    required: true
  }
});

//To use this in outside
const User = module.exports = mongoose.model('User', UserSchema);

//get user by ID
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

//get user by user name
module.exports.getUserByUserName = function(username, callback){
  const query = {uername: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt,(err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

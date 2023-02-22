 const mongoose = require('mongoose'); //Monday November 28th, 2022 4:46pm 
 const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); // 1/12/2023 5:06pm //Consistsnt modeling

  //Defining a user schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

  //email password not specified to add to user plugin. Making them unique
  UserSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('User', UserSchema);
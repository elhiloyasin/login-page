const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      min: 6,
      max: 30,
      required: false
   },
   email: {
      type: String,
      min: 6,
      max: 40,
      required: true
   },
   password: {
      type: String,
      min: 6,
      max: 50,
      required: true
   }

})

module.exports = mongoose.model('User', UserSchema);
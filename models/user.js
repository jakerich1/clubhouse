var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 15},
    last_name: {type: String, required: true, maxLength: 15},
    username: {type: String, required: true, maxlength: 15},
    password: {type: String, required: true, maxlength: 200},
    admin: {type: Boolean},
    member: {type: Boolean}
  }
);

// Virtual for user's full name
UserSchema.virtual('name').get(function () {
  return this.last_name + ', ' + this.first_name;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
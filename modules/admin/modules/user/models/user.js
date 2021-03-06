var mongoose = require('mongoose'), ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
  username: { type:String, unique:true, required:true },
  fullname: String,
  password: { type:String, select:false, required:true, validate:passwordValidator },
  email: String,
  isSuperuser: Boolean
  //roles: [{ type: ObjectId, ref: 'user_role' }]
  //isActive: Boolean
  //createdAt updatedAt createdBy, updatedBy
  //isDeleted
});

userSchema.methods.resetPassword = function() {
};
userSchema.methods._label = function() {
  return this.username + ' (' + this.fullname + ')';
};

userSchema.statics._labelFields = 'username fullname';

userSchema.statics.authenticate = function(username, password, callback) {
  this.findOne({username:username, password:password}, null, {lean:true}, function(err, user){
    callback(user);
  });
}

//userSchema.statics.uninstall = function() {
//  this.collection.drop();
//  console.log('user collection dropped');
//};

//userSchema.path('password').validate(passwordValidator, 'password must not be empty.');

function passwordValidator(val) {
  console.log('pwd validator');
  return val.trim() !== '';
}

module.exports = mongoose.model('user', userSchema, 'user');
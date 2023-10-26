const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
// const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')

 

const UserSchema = new mongoose.Schema({
  
  Fullname: {
    type: String,
    minLength: 5,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
   
  } ,
});

//UserSchema.index({ username: 1 }, { unique: true });

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, 
      name: this.Fullname ,
      gmail:this.gmail
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// UserSchema.methods.createJWT = function () {
//   return jwt.sign(
//     {  
//       username:this.Username,
      
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   );
// };

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
 


const User = mongoose.model('User', UserSchema);

module.exports = User;

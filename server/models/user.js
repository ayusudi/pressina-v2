const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bycrptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  image:{
    type: String,
    default : 'https://img.pngio.com/blank-avatarpng-avatar-png-486_489.png'
  },
  email: {
    type: String,
    require : [true,'Email is required'],
    validate : {
      validator :
        function (value){
          return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)
        },
      message: 'Email must include @ and .'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password length minimum 6']    
  },
},{
  timestamps: true,
  versionKey: false
})


userSchema.pre('save', function () {
  console.log('here');
 this.password = hashPassword(this.password)
  next()
})

userSchema.path('email').validate(function (value) {
  console.log('here');
  return User.findOne({ email: value })
      .then(isFound => {
          if (isFound) return false
      })
      .catch(err => {
          throw err;
      })
}, 'Email already exist')


const User = mongoose.model('User', userSchema)

module.exports = User
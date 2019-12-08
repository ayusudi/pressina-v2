const User = require('../models/user')
const { getToken } = require('../helpers/jwt')
const {comparePassword, hashPassword} = require('../helpers/bycrptjs')
const sgMail = require('@sendgrid/mail')
const {OAuth2Client} = require('google-auth-library')
const apiKey = process.env.SENDGRID_API_KEY
const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)
sgMail.setApiKey(apiKey)

class UserController {
  static create(req, res, next) {
    const { name, email, password } = req.body
    
    User.create({
      name,
      email,
      password
    })
    .then(data => {
      res.status(201).json({
        message: 'Success Create',
        user: data
      })
    })
    .catch(err => {
      next({
        status: 400,
        error: err
      })
    })
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        status: 400,
        message: 'Email/password is required'
      })
    }
    else {
      console.log(`ini yang login >>>> ${email}`);
      User.findOne({ email })
      .then(result => {
        if (result) {
          const { _id } = result
          if (comparePassword(password, result.password)) {
            let payload = {
              _id,
            }
            res.status(200).json({
              token: getToken(payload),
            })
          }
          else {
            next({
              status: 400,
              message: 'Wrong email/password'
            })
          }
        }
        else {
          next({
            status: 400,
            message: 'Wrong email/password'
          })
        }
      })
      .catch(next)
    }
  }
  
  static signInGoogle(req, res) {
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: clientID
    })
    .then(user => {
      let password = process.env.DEFAULT_PS
      let { email, name, picture } = user.payload
      console.log(`ini yang login >>>> ${email}`);
      User.findOne({ email })
      .then(result => {
        if (result) {
          return result
        }
        else {
          return User.create({
            name : name,
            email : email,
            image : picture,
            password
          })
        }
      })
      .then(userLogin => {
        let payload = {
          _id: userLogin._id
        }
        let token = getToken(payload)
        res.status(200).json({
          token
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Internal Server'
      })
    })
  }
  
  static identity(req, res, next){
    User.findById(req.decoded._id)
    .then(result =>{
      console.log(result);
      res.status(200).json(result)
    })
    .catch(next)
  }
  
  static sendCode(req, res, next){
    const {email, html} = req.body
    console.log(email);
    console.log(html);
    User.findOne({email})
    .then(result =>{
      if (result){
      
        const msg = {
          to: email,
          from: 'ayusudi.abc@gmail.com',
          subject: 'Reset Password Pressina Account',
          html: html,
        };
        sgMail.send(msg).then(data =>{
          res.status(200).json({
            message : `Pressina Sending Code To ${email}, please don't close this page`
          })
        })    
      }
      else {
        next({
          message : `There's no account with your email`,
          status : 404
        })
      }
    })
    .catch(next)
  }
  static edit(req, res, next){
    console.log(req.body);
    const {name, email} = req.body
    let image = req.body.featured_image || req.body.image
    User.updateOne({_id : req.decoded._id}, {
      name, email, image
    })
    .then(data=>{
      console.log(data);
      res.status(200).json({
        message : 'Done edit'
      })
    })
    .catch(next)
  }
  static resetPass(req, res, next){
    const {password} = req.body
    User.updateOne({_id : req.decoded._id},{
      password : hashPassword(password)
    })
    .then(data=>{
      console.log(data);
      res.status(200).json({
        message : 'Done edit'
      })
    })
    .catch(next)
  }
  static forgotPass(req, res, next){
    const {password, email} = req.body
    User.updateOne({email},{
      password : hashPassword(password)
    })
    .then(data=>{
      res.status(200).json({
        message : 'Done edit'
      })
    })
    .catch(next)
  }

}

module.exports = UserController
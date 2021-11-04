const bcrypt = require('bcrypt');
const User = require('../database/UserModel');
const jwt = require('jsonwebtoken');

module.exports = {

  async register(req, res){

    const errors = [];

    const { name, email, password, confirmPassword } = req.body;

    if(!name) errors.push('Name is required');
    if(!email) errors.push('E-mail is required');
    if(!password) errors.push('Password is required');
    if(!confirmPassword) errors.push('Confirm password is required');
    if(password != confirmPassword) errors.push('The password and its confirmation does not match');
    
    if(email){
      let userExists = await User.findOne({email: email}); 
      if(userExists) errors.push('This user already exists');
    }
    
    if(errors.length > 0) return res.json({ error: true, errors })

    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    const user = new User({
      name, 
      email, 
      password: password_hash
    });

    try {
      await user.save();
      return res.status(201).json({
        message: 'User created!'
      });

    } catch (error) {
      return res.status(500).json({error})
    }

  },

  async login(req, res){

    const errors = [];
    const { email, password } = req.body;

    if(!email) errors.push('Email is necessary to login');
    if(!password) errors.push('Password is necessary to login');

    if(email && password){

      let user = await User.findOne({email: email});
      if(user){
        let password_confirm = await bcrypt.compare(password, user.password);
        if (password_confirm) {
          return res.json({message: 'Authorized'})
        }else {
  
          errors.push('Email and/or password not confirmed');
        }
      }else {
        errors.push('This users is not registered');
      }
    }


    return res.json({error: true, errors})
  }
}
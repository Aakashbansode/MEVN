const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  email: String,
  qualification: String,
  mobile_no: Number,
  password: String
});

const User = mongoose.model('User', userSchema);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required().messages({
      'any.required': 'Name field is required',}),
    age: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    qualification: Joi.string().required(),
   // mobile_no: Joi.number().required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(User);
}

async function checkEmailExists(email) {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser !== null;
  } catch (error) {
    console.error('Error checking email:', error);
    throw new Error('Failed to check email.');
  }
}


module.exports = {
  User,
  validateUser,
  checkEmailExists
};



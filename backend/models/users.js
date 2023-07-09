const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  email: String,
  qualification: String,
  mobile_no: Number,
  password: String
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required().messages({
      'any.required': 'Name field is required',
    }),
    age: Joi.number().required(),
    address: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    qualification: Joi.string().required(),
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

async function loginuser(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    return existingUser;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Failed to login');
  }
}





module.exports = {
  User,
  validateUser,
  checkEmailExists,
  loginuser,
};

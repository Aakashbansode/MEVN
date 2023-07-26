const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


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

const createSession = async (user) => {
  const session = {
    id: uuidv4(), // Generate a session ID using uuidv4()
    userId: user._id,
    // ...other session data
  };

  // Store the session object in your chosen session storage mechanism
  // For example, you can use the `express-session` middleware to store the session in memory or a database
  // req.session.sessionId = session.id; // Assuming you have access to `req` object

  return session;
};



// // Function to get user by ID

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the user details');
  }
};


const updateUserById = async (userId, updatedUserData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the user details');
  }
};


module.exports = {
  User,
  validateUser,
  checkEmailExists,
  loginuser,
  createSession,
  getUserById,
  updateUserById
};

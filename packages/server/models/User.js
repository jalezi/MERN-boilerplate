const mongoose = require('mongoose');

// Create a simple User's schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = new mongoose.model('User', userSchema);

module.exports = User;

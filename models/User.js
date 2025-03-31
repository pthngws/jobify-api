const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'recruiter'], default: 'candidate' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

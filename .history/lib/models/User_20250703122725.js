import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  po: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashé
  imageUrl: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);

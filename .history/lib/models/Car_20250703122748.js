import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String },
  year: { type: Number, required: true },
  category: { type: String },
  seating_capacity: { type: Number },
  fuel_type: { type: String },
  transmission: { type: String },
  price: { type: Number, required: true },
  location: { type: String },
  description: { type: String },
  isAvaliable: { type: Boolean, default: true },
}, {
  timestamps: { createdAt: true, updatedAt: true }
});

export default mongoose.model('Car', carSchema);


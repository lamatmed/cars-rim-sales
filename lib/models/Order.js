import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['en attente', 'confirmée', 'refusée'], default: 'en attente' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema); 
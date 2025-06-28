import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  category: String,
  status: String,
  user_id: String
});

export default mongoose.model('Transaction', transactionSchema);

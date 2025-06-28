import express from 'express';
import Transaction from '../models/Transaction'; // we'll create this model
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

export default router;

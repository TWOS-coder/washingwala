import express from 'express';
import Vendor from '../models/vendorModel.js';

const router = express.Router();

// POST /api/vendor - save vendor data
router.post('/', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ message: 'Vendor saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save vendor' });
  }
});

export default router;

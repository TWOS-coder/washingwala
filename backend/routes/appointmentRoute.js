import express from 'express';
import Razorpay from 'razorpay';
import Appointment from '../models/Appointment.js'; // Make sure this model exists
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance with keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to get Razorpay public key for frontend
router.get('/razorpay-key', (req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID });
});

// Booking endpoint
router.post('/book-appointment', async (req, res) => {
  try {
    const {
      docId,
      slotDate,
      slotTime,
      paymentId,
      paymentAmount,
      contactNumber,
      address,
    } = req.body;

    // Basic validation
    if (!docId || !slotDate || !slotTime || !paymentId || !paymentAmount || !contactNumber || !address) {
      return res.status(400).json({ success: false, message: 'Missing required booking fields' });
    }

    // Fetch payment info from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    console.log('Payment verification status:', payment.status);

    // Accept both 'captured' and 'authorized' for testing purposes
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Create appointment document
    const newAppointment = new Appointment({
      docId,
      slotDate,
      slotTime,
      paymentId,
      paymentAmount,
      contactNumber,
      address,
    });

    await newAppointment.save();

    res.json({ success: true, message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Server error during booking' });
  }
});

export default router;

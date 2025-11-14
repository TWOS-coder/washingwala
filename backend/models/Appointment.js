import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  paymentId: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments');

export default Appointment;

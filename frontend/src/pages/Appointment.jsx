import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const showThankYouPopup = () => alert('Thank you for your booking! Your appointment is confirmed.');

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctosData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const [razorpayKey, setRazorpayKey] = useState('');

  const navigate = useNavigate();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    if (doctors.length && docId) {
      const doctor = doctors.find(doc => doc._id === docId);
      setDocInfo(doctor);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      generateAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    // Fetch Razorpay public key from backend
    const fetchRazorpayKey = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/appointment/razorpay-key`);
        setRazorpayKey(response.data.keyId);
      } catch (error) {
        toast.error('Failed to load payment configuration.');
      }
    };
    fetchRazorpayKey();
  }, [backendUrl]);

  const generateAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.toDateString() === currentDate.toDateString()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let daySlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotDateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isBooked = docInfo.slots_booked[slotDateKey]?.includes(formattedTime);

        if (!isBooked) {
          daySlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(daySlots);
    }
    setDocSlots(slots);
    setSelectedDayIndex(0);
    setSelectedTime('');
  };

  const openRazorpay = async (amount) => {
    if (!razorpayKey) {
      toast.error('Payment gateway is not configured');
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: 'INR',
      name: 'Washing Wala',
      description: `Advance payment for appointment with Dr. ${docInfo.name}`,
      handler: async (response) => {
        try {
          const selectedDateObj = docSlots[selectedDayIndex][0].datetime;
          const slotDate = `${selectedDateObj.getDate()}_${selectedDateObj.getMonth() + 1}_${selectedDateObj.getFullYear()}`;

          const postData = {
            docId,
            slotDate,
            slotTime: selectedTime,
            paymentId: response.razorpay_payment_id,
            paymentAmount: amount,
            contactNumber,
            address,
          };

          const { data } = await axios.post(`${backendUrl}/api/appointment/book-appointment`, postData);

          if (data.success) {
            toast.success(data.message);
            getDoctosData();
            showThankYouPopup();
            navigate('/my-appointments');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(`Booking failed: ${error.message}`);
        }
      },
      prefill: {
        name: 'Customer',
        email: '',
        contact: contactNumber,
      },
      theme: { color: '#EF4444' },
      modal: {
        ondismiss: () => {
          toast.info('Payment cancelled');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBooking = () => {
    if (docSlots.length === 0 || !selectedTime) {
      toast.warning('Please select a date and time slot');
      return;
    }
    if (!contactNumber || !address) {
      toast.warning('Please enter your contact number and address');
      return;
    }

    const advanceAmount = Number((docInfo.fees * 0.3).toFixed(2));
    openRazorpay(advanceAmount);
  };

  if (!docInfo) return null;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-lg shadow p-6">
        <img src={docInfo.image} alt={docInfo.name} className="w-full sm:w-48 rounded-lg object-cover" />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-700 flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5" />
          </h2>
          <p className="mt-2 font-medium text-gray-600">{docInfo.about}</p>
          <p className="mt-4 font-semibold text-gray-800">
            Appointment Fee: {currencySymbol}
            {docInfo.fees}
          </p>
          <p className="mt-1 text-sm text-gray-500 font-light">
            Advance Payment (30%): {currencySymbol}
            {(docInfo.fees * 0.3).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Booking Slots</h3>
        <div className="flex gap-4 overflow-x-auto mb-4">
          {docSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`cursor-pointer rounded-full px-4 py-3 min-w-[60px] text-center font-semibold ${
                selectedDayIndex === index ? 'bg-red-600 text-white' : 'border border-gray-300 text-gray-600'
              }`}
            >
              <p>{daysOfWeek[daySlots[0]?.datetime.getDay()]}</p>
              <p>{daySlots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto">
          {docSlots[selectedDayIndex]?.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTime(slot.time)}
              className={`px-5 py-2 rounded-full text-sm ${
                selectedTime === slot.time ? 'bg-red-600 text-white' : 'border border-gray-400 text-gray-700'
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Contact Number and Address Inputs */}
        <div className="mt-6 max-w-xs">
          <label className="block mb-2 font-semibold text-gray-700">Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={e => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
            className="w-full p-2 border rounded mb-4"
          />
          <label className="block mb-2 font-semibold text-gray-700">Address</label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your address"
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Payment details */}
        {selectedTime && (
          <div className="mt-6 p-4 border rounded bg-gray-50 max-w-xs">
            <p className="font-semibold text-gray-700 mb-1">Payment Details</p>
            <p>
              Full Appointment Fee: {currencySymbol}
              {docInfo.fees}
            </p>
            <p>
              30% Advance Amount: {currencySymbol}
              {(docInfo.fees * 0.3).toFixed(2)}
            </p>
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={!selectedTime || loading}
          className="mt-6 px-12 py-3 bg-red-600 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Book Appointment'}
        </button>
      </div>
    </div>
  );
};

export default Appointment;

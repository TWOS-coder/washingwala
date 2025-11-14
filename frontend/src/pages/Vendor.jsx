import React, { useState, useEffect } from 'react';
import { vendorData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    name: 'Rahul Sharma',
    review: 'Joining Washing Wala as a vendor has transformed my business. The support and payments are timely!',
    location: 'Mumbai',
  },
  {
    name: 'Anita Desai',
    review: 'Flexible timings and good earning potential. Highly recommend Washing Wala to fellow entrepreneurs.',
    location: 'Pune',
  },
  {
    name: 'Suresh Kumar',
    review: 'A great platform with excellent customer reach. My monthly income has increased significantly.',
    location: 'Bangalore',
  },
];

const Vendor_menu = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    subscribed: false,
    subscriptionPlan: '', // monthly or premium
    kycIdNumber: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showKycForm, setShowKycForm] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: 19900, // in paise (₹199)
      displayPrice: 'Free for 30 days',
      description: 'Free for 30 days, then ₹199/month',
      benefits: [
        'Get 2 to 3 bookings daily',
        'Earn ₹400 to ₹700 per day',
        'Flexible working hours',
        'Performance-based incentives every 3-6 months',
        'Branding kit after completing 100 orders',
        'No waiting for settlement — direct customer payments',
      ],
    },
    premium: {
      name: '1 Year Premium Plan',
      price: 239900, // in paise (₹2399)
      displayPrice: '₹2399',
      description: '14 months subscription (12 + 2 extra months), plus free branding kit worth ₹799',
      benefits: [
        'All benefits of Monthly Plan',
        'Free branding kit including:',
        '1 T-Shirt',
        '5 microfiber cloths (500 GSM)',
        '1 L car wash shampoo',
        '1 KG dashboard and tyre polish',
        '0.5 L glass cleaner',
        'Cleaning brushes',
      ],
    },
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSelectBenefit = (item) => {
    navigate('/vendor', { state: { benefit: item.benefit } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      subscriptionPlan: e.target.value,
      subscribed: true,
    }));
    setShowKycForm(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.businessName.trim()) errors.businessName = 'Business name is required';
    if (!formData.city.trim()) errors.city = 'City is required';

    if (formData.subscribed) {
      if (!formData.kycIdNumber.trim()) errors.kycIdNumber = 'KYC ID Number is required';
      if (!formData.subscriptionPlan) errors.subscriptionPlan = 'Please select a subscription plan';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to open Razorpay checkout and handle payment success/failure
  const openRazorpay = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const plan = plans[formData.subscriptionPlan];
    if (!plan) {
      alert('Please select a subscription plan');
      return;
    }

    setIsPaying(true);

    // Create an order on your backend first and get order_id, amount etc.
    // For simplicity, we simulate this here.
    // Replace this with your own backend API call
    const orderData = {
      amount: plan.price,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    // You should call your backend to create order and get order_id
    // Here simulate order_id for demo purpose
    const order_id = `order_${Math.random().toString(36).substr(2, 9)}`;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // your Razorpay Key
      amount: plan.price,
      currency: 'INR',
      name: 'Washing Wala',
      description: plan.name + ' Subscription Payment',
      order_id: order_id,
      handler: async function (response) {
        // You should verify payment signature via backend here before submitting form
        // After verification, submit the form data including payment details
        const paymentResult = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        await submitFormData(paymentResult);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#CB202D',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert(`Payment failed: ${response.error.description}`);
      setIsPaying(false);
    });
    rzp.open();
  };

  // Submit form data to backend with payment info
  const submitFormData = async (paymentResult) => {
    try {
      const payload = {
        ...formData,
        paymentResult,
      };

      const response = await fetch('http://localhost:4000/api/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Partner subscription and registration successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          city: '',
          subscribed: false,
          subscriptionPlan: '',
          kycIdNumber: '',
        });
        setShowKycForm(false);
        setIsPaying(false);
      } else {
        alert('Failed to submit form');
        setIsPaying(false);
      }
    } catch (error) {
      alert('Error submitting form');
      setIsPaying(false);
    }
  };

  // On form submit, validate and proceed to payment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      openRazorpay();
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="bg-[#f7f9fc] min-h-screen font-inter" style={{ color: 'rgb(17, 24, 39)' }}>

        {/* Become a Partner Section */}
        <section
          id="speciality"
          className="flex flex-col items-center gap-8 py-20 px-4 max-w-6xl mx-auto bg-white rounded-xl shadow-md"
        >
          <h1 className="text-4xl font-semibold text-center mb-4">Become a Partner</h1>
          <p className="max-w-3xl text-center text-base leading-relaxed">
            Zero Risk. Zero Investment. Unlimited Earning Potential. Step into a business partnership without
            spending a single rupee. With our program, you don’t need capital or prior experience—just your
            time and dedication. Start today.
          </p>
          <h2 className="max-w-3xl text-center font-medium" style={{ color: 'rgb(17,24,39,0.75)' }}>
            Requirements: Valid business registration, car wash experience, own equipment and transportation,
            insurance coverage required, background verification clearance.
          </h2>

          <div className="flex gap-6 overflow-x-auto px-2 sm:justify-center w-full scrollbar-thin scrollbar-thumb-gray-300">
            {vendorData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectBenefit(item)}
                className="flex flex-col items-center min-w-[100px] sm:min-w-[150px] cursor-pointer rounded-lg p-4 transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CB202D]"
                aria-label={`Partner with ${item.benefit}`}
                type="button"
              >
                <img
                  src={item.image}
                  alt={`${item.benefit} icon`}
                  className="w-16 sm:w-24 mb-3 object-contain"
                />
                <p className="text-sm font-medium text-center">{item.benefit}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Subscription Plan Section */}
        <section className="max-w-5xl mx-auto py-12 px-6 bg-white rounded-xl shadow-md mt-12">
          <h1 className="text-4xl font-extrabold mb-6 text-center">Choose Your Subscription Plan</h1>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`flex-1 bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-transform hover:scale-105 border-2 ${
                  formData.subscriptionPlan === key ? 'border-[#CB202D]' : 'border-transparent'
                }`}
                onClick={() => handlePlanChange({ target: { value: key } })}
              >
                <label className="block cursor-pointer select-none" style={{ color: 'rgb(17, 24, 39)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="radio"
                      name="subscriptionPlan"
                      value={key}
                      checked={formData.subscriptionPlan === key}
                      onChange={handlePlanChange}
                      className="accent-[#CB202D] w-6 h-6"
                    />
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                    <p className="text-xl font-semibold text-[#CB202D]">
                      {key === 'monthly' ? 'Free for 30 days' : `₹${plan.price / 100}`}
                    </p>
                  </div>
                  <p className="italic text-gray-600 mb-4">{plan.description}</p>
                  <ul className="list-disc ml-5 leading-relaxed text-gray-700 text-sm">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </label>
              </div>
            ))}
          </div>
          {formErrors.subscriptionPlan && (
            <p className="text-red-600 mt-3 text-center font-medium">{formErrors.subscriptionPlan}</p>
          )}
        </section>

        {/* KYC & Payment Form */}
        {showKycForm && (
          <section className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md mb-20 mt-12" style={{ color: 'rgb(17, 24, 39)' }}>
            <h2 className="text-3xl font-semibold mb-8 text-center">Complete KYC and Registration</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {[
                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name' },
                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter your email' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
                { label: 'Business Name', name: 'businessName', type: 'text', placeholder: 'Enter your business name' },
                { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city' },
                { label: 'KYC ID Number', name: 'kycIdNumber', type: 'text', placeholder: 'Enter your KYC ID number' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block font-medium mb-2">
                    {label} *
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-md border ${
                      formErrors[name] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#CB202D] focus:border-transparent transition`}
                    style={{ color: 'rgb(17, 24, 39)' }}
                  />
                  {formErrors[name] && (
                    <p className="text-red-600 mt-1 text-sm">{formErrors[name]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={isPaying}
                className={`w-full ${
                  isPaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#CB202D] hover:bg-[#9c1a25]'
                } transition-colors text-white font-semibold py-3 rounded-md text-lg`}
              >
                {isPaying ? 'Processing Payment...' : 'Pay & Submit Application'}
              </button>
            </form>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="max-w-5xl mx-auto mb-24 px-6 bg-white rounded-xl shadow-md" style={{ color: 'rgb(17, 24, 39)' }}>
          <h2 className="text-3xl font-extrabold mb-12 text-center">Hear From Our Successful Vendors</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map(({ name, review, location }, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col"
                style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', color: 'rgb(17,24,39)' }}
              >
                <svg
                  className="w-8 h-8 text-[#CB202D] mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.17 6.987A4.5 4.5 0 015.22 9.38a4.373 4.373 0 01-.34 4.58C3.651 15.752 2 17.75 2 19.5h5.5a5.5 5.5 0 000-11zM19.11 6.987A4.5 4.5 0 0117.16 9.38a4.37 4.37 0 01-.343 4.58c-1.132 1.407-2.783 3.405-2.783 5.155h5.5a5.5 5.5 0 000-11z" />
                </svg>
                <p className="mb-6 text-lg leading-relaxed">"{review}"</p>
                <p className="mt-auto font-semibold text-[#CB202D]">{name}</p>
                <p className="text-sm text-gray-500">{location}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default Vendor_menu;

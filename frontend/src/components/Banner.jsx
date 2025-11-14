import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row bg-primary rounded-xl shadow-lg overflow-hidden my-20 md:mx-10">
      {/* Left Side */}
      <div className="flex-1 px-8 sm:px-12 md:px-16 lg:px-20 py-12 flex flex-col justify-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Book Appointment
        </h1>
        <p className="text-white mt-6 text-base sm:text-lg max-w-md">
          Powering spotless rides with 100+ trusted vendors, serving all across India.
        </p>
        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-8 px-10 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300 ease-in-out max-w-max"
          aria-label="Create account"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:flex-shrink-0 md:w-1/3 lg:w-[300px] relative">
        <img
          src={assets.appointment_img}
          alt="Booking Appointment Illustration"
          className="absolute bottom-0 right-0 w-full max-w-sm object-contain drop-shadow-xl"
          style={{ maxHeight: '300px' }}
        />
      </div>
    </section>
  );
};

export default Banner;

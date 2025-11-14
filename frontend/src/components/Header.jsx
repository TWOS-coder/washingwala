import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <section className="flex flex-col md:flex-row bg-primary rounded-xl overflow-hidden px-6 md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="md:w-1/1 flex flex-col items-start justify-center gap-6 py-12 md:py-[8vw] max-w-xl mx-auto md:mx-0">
        <h1 className="text-white font-extrabold leading-tight text-3xl sm:text-4xl lg:text-5xl">
          Book Appointment <br /> With Washing Wala
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light">
          <img className="w-24 sm:w-28 flex-shrink-0" src={assets.group_profiles} alt="Group profiles" />
          <p className="max-w-sm">
            Enjoy a sparkling clean car without leaving home
            <br className="hidden sm:block" />
            book your doorstep car wash in just a few taps!
          </p>
        </div>
        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm hover:scale-105 transition transform duration-300 ease-in-out"
        >
          Book appointment <img className="w-4" src={assets.arrow_icon} alt="Arrow icon" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative flex justify-center md:justify-end items-center md:items-end">
        <img
          className="w-full max-w-md md:max-w-lg rounded-lg object-cover"
          src={assets.header_img}
          alt="Car wash service illustration"
          style={{ maxHeight: '400px', width: 'auto' }}
        />
      </div>
    </section>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

const SocialIcons = () => (
  <div className="flex justify-center gap-6 py-6 text-2xl">
    <a
      href="https://www.facebook.com/share/16q6Fq2Kxs/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
    >
      <FaFacebookF />
    </a>
    <a
      href="https://twitter.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
    >
      <FaTwitter />
    </a>
    <a
      href="https://www.instagram.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="https://www.instagram.com/washingvaalaa?igsh=MTh2N3VrM2V5YnRhZw=="
    >
      <FaInstagram />
    </a>
    <a
      href="https://www.linkedin.com/in/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
    >
      <FaLinkedinIn />
    </a>
    <a
      href="https://www.youtube.com/yourchannel"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="text-red-600 hover:text-red-800 transition-colors duration-300"
    >
      <FaYoutube />
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-40 pt-12 md:mx-auto max-w-7xl px-6 sm:px-10 md:px-14 rounded-t-lg text-gray-700 text-sm select-none">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12 max-w-7xl mx-auto">
        <div>
          <img
            className="mb-6 w-44 object-contain"
            src={assets.logo}
            alt="Washing Wala logo"
          />
          <p className="max-w-md leading-relaxed text-gray-600">
            Washing Wala is a convenient doorstep car wash service that brings
            expert car cleaning right to your home or office. With easy online
            booking, trained professionals arrive with eco-friendly products and
            all necessary equipment to wash, vacuum, and detail your vehicle.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Company</h3>
          <ul className="flex flex-col gap-3">
            {['Home', 'About us', 'Services', 'Privacy policy'].map((item) => (
              <li
                key={item}
                className="hover:text-primary cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Get in Touch</h3>
          <ul className="flex flex-col gap-3">
            <li>+91-9977166001/02</li>
            <li>Customer Care: support@washingwala.com</li>
            <li>Vendor Support: info@washingwala.com</li>
          </ul>
        </div>
      </div>

      <SocialIcons />

      {/* Admin Panel Login Button */}
      <div className="flex justify-center mt-8">
          <a
    href="http://localhost:5174/admin/src/pages/Login.jsx"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors duration-300">
      Admin Panel Login
    </button>
  </a>
      </div>

      <div className="border-t border-gray-300 pt-6 pb-10 mt-10">
        <p className="text-center text-gray-500 text-xs">
          &copy; 2025 mywashingwala.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

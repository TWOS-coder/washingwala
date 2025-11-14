import React from 'react';
import { vendorData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Vendor_menu = () => {
  const navigate = useNavigate();

  // On clicking a benefit button, navigate to vendor.jsx with benefit info in state or params
  const handleSelectBenefit = (item) => {
    navigate('/vendor', { state: { benefit: item.benefit } });
  };

  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-8 py-20 px-4 max-w-6xl mx-auto text-gray-900"
    >
      <h1 className="text-4xl font-semibold text-center">Become a Partner</h1>

      <p className="max-w-3xl text-center text-base leading-relaxed text-gray-700">
        Zero Risk. Zero Investment. Unlimited Earning Potential. Step into a business partnership without
        spending a single rupee. With our program, you don’t need capital or prior experience—just your
        time and dedication. Start today.
      </p>

      <h2 className="max-w-3xl text-center text-gray-600 font-medium">
        Requirements: Valid business registration, car wash experience, own equipment and transportation,
        insurance coverage required, background verification clearance.
      </h2>

      <div className="flex gap-6 overflow-x-auto px-2 sm:justify-center w-full scrollbar-thin scrollbar-thumb-gray-300">
        {vendorData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectBenefit(item)}
            className="flex flex-col items-center min-w-[100px] sm:min-w-[150px] cursor-pointer rounded-lg p-4 transition-transform duration-300 hover:-translate-y-3 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Partner with ${item.benefit}`}
            type="button"
          >
            <img
              src={item.image}
              alt={`${item.benefit} icon`}
              className="w-16 sm:w-24 mb-3 object-contain" // show full image, no circle
            />
            <p className="text-sm font-medium text-center">{item.benefit}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Vendor_menu;

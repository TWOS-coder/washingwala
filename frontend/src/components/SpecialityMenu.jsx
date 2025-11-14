import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="flex flex-col items-center gap-6 py-16 text-gray-900 max-w-7xl mx-auto px-4 md:px-10">
      <h1 className="text-4xl font-semibold text-center">Clean. Fast. Friendly.</h1>
      <p className="max-w-xl text-center text-base text-gray-600">
        Discover top-rated car wash services at your fingertips—schedule effortlessly and enjoy a sparkling clean ride, every time.
      </p>

      <div className="flex gap-6 overflow-x-auto w-full py-6 px-2 scrollbar-thin scrollbar-thumb-gray-300">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            key={index}
            className="flex flex-col items-center min-w-[110px] sm:min-w-[140px] cursor-pointer rounded-lg p-3 transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`View ${item.speciality} services`}
          >
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 bg-gray-100"
              src={item.image}
              alt={`${item.speciality} icon`}
            />
            <p className="text-sm font-medium text-center text-gray-800">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;

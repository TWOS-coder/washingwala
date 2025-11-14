import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const handleNavigate = (id) => {
    navigate(`/appointment/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto my-16 px-4 md:px-10 text-gray-900">
      <h1 className="text-4xl font-semibold text-center mb-3">Top Services to Book</h1>
      <p className="max-w-xl mx-auto text-center text-lg text-gray-600">
        Discover top-rated car wash services at your fingertips
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 pt-8">
        {doctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(doctor._id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleNavigate(doctor._id);
            }}
            className="cursor-pointer rounded-xl bg-white border border-blue-200 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col items-center p-4"
          >
            {/* Circular image */}
            <img
              src={doctor.image}
              alt={`${doctor.name} service`}
              className="w-20 h-20 rounded-full object-cover mb-4 bg-blue-50"
            />

            {/* Availability badge */}
            <div className="flex items-center gap-2 text-sm mb-1">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  doctor.available ? 'bg-green-500' : 'bg-gray-400'
                }`}
                aria-hidden="true"
              />
              <span className={`font-medium ${doctor.available ? 'text-green-600' : 'text-gray-500'}`}>
                {doctor.available ? 'Available' : 'Not Available'}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>

            {/* Fees */}
            <p className="text-sm text-gray-600">{doctor.fees}</p>

            {/* Description below */}
            <p className="mt-2 text-xs text-gray-500 text-center line-clamp-3">{doctor.about}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-blue-100 text-blue-700 px-16 py-3 rounded-full font-semibold hover:bg-blue-200 transition"
          aria-label="View more services"
        >
          More
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;

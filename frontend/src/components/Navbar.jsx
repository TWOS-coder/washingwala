import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const menuLinks = [
    { to: '/', label: 'HOME' },
    { to: '/doctors', label: 'SERVICES' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
    { to: '/vendor', label: 'BECOME A PARTNER' },
  ];

  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-40 cursor-pointer"
          src={assets.logo}
          alt="Washing Wala Logo"
          aria-label="Go to homepage"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-700 select-none">
          {menuLinks.map(({ to, label }) => (
            <li key={to} className="relative group">
              <NavLink
                end
                to={to}
                className={({ isActive }) =>
                  `py-1 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'hover:text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/5 group-hover:left-1/5 group-focus:w-3/5 group-focus:left-1/5"></span>
            </li>
          ))}
        </ul>

        {/* User Section */}
        <div className="flex items-center gap-4 relative">
          {token && userData ? (
            <div className="group relative">
              <button
                aria-haspopup="true"
                aria-expanded="false"
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData.image}
                  alt={`${userData.name} profile`}
                />
                <img className="w-3 h-3" src={assets.dropdown_icon} alt="Dropdown icon" />
              </button>

              {/* Dropdown Menu */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute right-0 mt-2 bg-white rounded-md shadow-lg py-3 min-w-[180px] text-gray-700 font-medium transition-all duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50">
                <button
                  onClick={() => navigate('/my-profile')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Appointments
                </button>
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
          >
            <img className="w-6 h-6" src={assets.menu_icon} alt="Open menu icon" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <img src={assets.logo} alt="Washing Wala Logo" className="w-36" />
          <button
            onClick={() => setShowMenu(false)}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close menu"
          >
            <img src={assets.cross_icon} alt="Close menu icon" className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col mt-6 px-6 space-y-4 text-lg font-semibold text-gray-700">
          {menuLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-2 px-4 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-primary-light text-primary' : 'hover:bg-primary-light'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate('/login');
              }}
              className="mt-4 bg-primary px-6 py-3 rounded-full text-white font-semibold hover:bg-primary-dark transition"
            >
              Create Account
            </button>
          )}
          {token && userData && (
            <>
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/my-profile');
                }}
                className="py-2 px-4 rounded-md hover:bg-gray-100 text-left"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/my-appointments');
                }}
                className="py-2 px-4 rounded-md hover:bg-gray-100 text-left"
              >
                My Appointments
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="py-2 px-4 rounded-md hover:bg-gray-100 text-left"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;

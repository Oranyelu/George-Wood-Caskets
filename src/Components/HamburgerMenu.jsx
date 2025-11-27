import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../Providers/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import LanguageSwitcher from './LanguageSwitcher';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "PRODUCTS", path: "/products" },
    { name: "SERVICES", path: "/services" },
    { name: "ABOUT US", path: "/about-us" },
    { name: "GIVING", path: "/giving" },
    { name: "TRACK ORDER", path: "/track-order" },
    { name: "XCLUSIVE", path: "/xclusive" },
  ];

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="text-white text-2xl focus:outline-none z-50 relative"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay Menu */}
      <div
        className={`fixed inset-0 bg-primary/95 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col justify-center items-center`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-2xl font-serif font-bold transition-colors duration-200 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="w-full h-[1px] bg-white/20 my-2"></div>

          {user ? (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={toggleMenu}
                  className="text-xl font-serif font-bold text-secondary hover:text-white transition-colors"
                >
                  ADMIN DASHBOARD
                </NavLink>
              )}
              <button
                onClick={() => {
                  signOut(auth);
                  toggleMenu();
                }}
                className="text-xl font-serif font-bold text-white hover:text-secondary transition-colors"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={toggleMenu}
              className="text-xl font-serif font-bold text-white hover:text-secondary transition-colors"
            >
              LOGIN
            </NavLink>
          )}

          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;

import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { BsBag } from "react-icons/bs";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { ProductContext } from "../Providers/ProductProvider";
import { useAuth } from "../Providers/AuthProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { cart } = useContext(ProductContext);
  const { user, isAdmin, logout } = useAuth();
  const cartItemCount = cart.length;
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Expanded IF: (At Top) OR (Hovered) OR (User Menu Open)
  const isExpanded = !isScrolled || isHovered || isUserMenuOpen;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-[1rem] font-sans">
      {/* Top Strip */}
      <div
        className={`hidden lg:block relative z-40 bg-[#A37E2C] text-white text-sm transition-all duration-500 ease-in-out origin-top border-b border-white/10 ${!isScrolled ? 'h-10 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="max-w-[1300px] mx-auto flex justify-between items-center h-full px-8">
          <div className="flex gap-6">
            <p>08143904414</p>
            <p>georgewoodcasket@gmail.com</p>
          </div>
          <div className="flex items-center gap-4">
            <p>
              Follow us:{" "}
              <a
                href="https://www.instagram.com/georgewoodcaskets?igsh=MWttbHNsMmdreHhoNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors font-semibold"
              >
                @georgewoodcaskets
              </a>
            </p>
            <div className="h-4 w-px bg-white/30"></div>
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="bg-transparent p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spacing Placeholder */}
      <div className={`transition-all duration-500 ease-in-out ${!isScrolled ? 'h-4' : 'h-2'}`}></div>

      {/* DYNAMIC ISLAND CONTAINER */}
      <div className={`flex px-4 justify-end transition-all duration-500 ease-in-out`}>
        <section
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative z-50 flex items-center justify-between 
            bg-[#135B3A] text-white shadow-2xl rounded-full 
            transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
            ${isExpanded ? "overflow-visible" : "overflow-hidden"}
            ${isExpanded
              ? "max-w-[1400px] w-full px-8 py-3" // Expanded state
              : "max-w-[200px] w-full px-5 py-2" // Collapsed state (Fixed width for smooth transition)
            }
          `}
        >
          {/* LOGO */}
          <div className={`flex items-center transition-all duration-500 ease-in-out`}>
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 lg:h-10 w-auto shrink-0" />
              {/* Logo Text */}
              <div
                className={`
                  hidden lg:block ml-3 font-bold text-lg lg:text-xl whitespace-nowrap 
                  transition-all duration-500 ease-in-out overflow-hidden
                  ${isExpanded ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"}
                `}
              >
                George Wood
              </div>
            </NavLink>
          </div>

          {/* NAVIGATION LINKS */}
          <div
            className={`
              hidden lg:flex transition-all duration-500 ease-in-out overflow-hidden
              ${isExpanded ? "max-w-[800px] opacity-100 ml-8" : "max-w-0 opacity-0 ml-0"}
            `}
          >
            <nav className="flex gap-6 text-sm font-medium tracking-wide whitespace-nowrap">
              {[
                { name: t("home"), path: "/" },
                { name: t("products"), path: "/products" },
                { name: t("services"), path: "/services" },
                { name: t("about_us"), path: "/about-us" },
                { name: t("giving"), path: "/charity" },
                { name: t("track_order"), path: "/track-order" },
                { name: t("xclusive"), path: "/xclusive" },
                { name: t("bonds"), path: "/bonds" },
              ].map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative hover:text-[#C29E2E] transition-colors ${isActive ? "text-[#C29E2E]" : ""}`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">


            {/* Cart Icon */}
            <div
              className={`
                relative transition-all duration-500 ease-in-out overflow-hidden
                ${isExpanded ? "max-w-[50px] opacity-100" : "max-w-0 opacity-0"}
              `}
            >
              <NavLink to="/cart" className="flex items-center hover:text-[#C29E2E] transition-colors">
                <BsBag size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* User Profile */}
            <div
              className={`
                 relative transition-all duration-500 ease-in-out
                 ${isUserMenuOpen ? "overflow-visible" : "overflow-hidden"}
                 ${isExpanded ? "max-w-[50px] opacity-100" : "max-w-0 opacity-0"}
               `}
            >
              {user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center hover:text-[#C29E2E] focus:outline-none"
                    aria-label="User Menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <FaUserCircle size={24} />
                  </button>
                  {/* Dropdown */}
                  {isExpanded && isUserMenuOpen && (
                    <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 animate-fade-in-up border border-gray-100 dark:border-gray-700">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 mb-1">
                        Signed in as <br />
                        <span className="font-bold truncate block text-[#135B3A] dark:text-green-400">{user.email}</span>
                      </div>

                      <NavLink
                        to="/user/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#135B3A]"
                      >
                        User Dashboard
                      </NavLink>

                      <NavLink
                        to="/favorites"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#135B3A]"
                      >
                        My Favorites
                      </NavLink>

                      {isAdmin && (
                        <NavLink
                          to="/admin/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#135B3A]"
                        >
                          {t("admin_dashboard")}
                        </NavLink>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                      >
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="font-semibold hover:text-[#A37E2C] transition-colors text-sm"
                >
                  {t("login")}
                </NavLink>
              )}
            </div>

            {/* Mobile Hamburger - Always Visible on Mobile */}
            <div className="lg:hidden ml-2">
              <HamburgerMenu />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

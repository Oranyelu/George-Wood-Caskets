import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { BsBag, BsSearch } from "react-icons/bs";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { ProductContext } from "../Providers/ProductProvider";
import { useAuth } from "../Providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "../Providers/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { cart } = useContext(ProductContext);
  const { user, isAdmin } = useAuth();
  const cartItemCount = cart.length;
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOGIC:
  // Expanded IF: (At Top) OR (Hovered)
  // Collapsed IF: (Scrolled) AND (Not Hovered)
  const isExpanded = !isScrolled || isHovered;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-[1rem] font-sans">
      {/* Top Strip - ALWAYS BRONZE, visible only on big screens */}
      {/* Logic: Hidden if Scrolled Down (unless we want it to reappear on hover? Usually top strip stays hidden on scroll). Keeping as is: Hidden on scroll. */}
      <div className={`hidden lg:block relative z-40 bg-[#A37E2C] text-white text-sm transition-all duration-300 ${!isScrolled ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
        <div className="max-w-[1300px] mx-auto flex justify-between p-2 px-8">
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
      <div className={`transition-all duration-300 ${!isScrolled ? 'h-2 lg:h-4' : 'h-2'}`}></div>

      {/* DYNAMIC ISLAND CONTAINER */}
      {/* Alignment: Always justify-end (right side) so it collapses to the right. When full width, it fills space. */}
      <div className={`flex px-4 transition-all duration-500 ease-in-out justify-end`}>
        <section
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative z-50 flex items-center justify-between 
            bg-[#135B3A] text-white shadow-2xl rounded-full 
            transition-all duration-500 ease-in-out
            ${isExpanded
              ? "w-full max-w-[1300px] px-8 py-3 mx-auto" // Expanded: Full width, centered (mx-auto overrides justify-end visual via margin)
              : "w-auto px-4 py-2" // Collapsed: Compact, right-aligned (due to parent justify-end)
            }
          `}
        >
          {/* LOGO */}
          {/* Visible if Expanded OR (Mobile & Collapsed - per previous request). 
              User request: "when user scrolls down... header should collapse to right. show only logo, search, hamburger".
              So Logo is ALWAYS visible?
              Desktop Collapsed: The user said "collapse to the right side". Usually means a pill.
              If I keep Logo visible on Desktop Collapsed, it fits.
          */}
          <div className={`
             flex items-center transition-all duration-500 ease-in-out overflow-hidden
             ${isExpanded ? "opacity-100 translate-x-0" : "opacity-100 translate-x-0"}
          `}>
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 lg:h-10 w-auto" />
              {/* Text: Hide if Collapsed to save space? User said "show logo", could mean just icon. 
                  Let's hide text on collapsed for cleaner "pill" look, show on expanded.
              */}
              <div className={`ml-3 font-bold text-lg lg:text-xl whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0 hidden sm:block"}`}>
                George Wood
              </div>
            </NavLink>
          </div>

          {/* NAVIGATION LINKS - Only Visible if Expanded */}
          <div className={`
            hidden lg:flex transition-all duration-500 ease-in-out overflow-hidden
            ${isExpanded ? "w-auto opacity-100 scale-100 ml-8" : "w-0 opacity-0 scale-90"}
          `}>
            <nav className="flex gap-6 text-sm font-medium tracking-wide">
              {[
                { name: t("home"), path: "/" },
                { name: t("products"), path: "/products" },
                { name: t("services"), path: "/services" },
                { name: t("about_us"), path: "/about-us" },
                { name: t("giving"), path: "/giving" },
                { name: t("track_order"), path: "/track-order" },
                { name: t("xclusive"), path: "/xclusive" },
                { name: t("bonds"), path: "/bonds" },
              ].map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative hover:text-[#A37E2C] transition-colors whitespace-nowrap ${isActive ? "text-[#A37E2C]" : ""}`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* RIGHT ICONS */}
          <div className={`flex items-center gap-4 lg:gap-6`}>
            {/* Search Icon */}
            <button className="hover:text-[#A37E2C] transition-colors">
              <BsSearch size={20} />
            </button>

            {/* Cart Icon - User previously said "show only logo, search, hamburger" on mobile collapsed. 
                I will hide Cart/Profile on Collapsed state for BOTH Desktop/Mobile if consistent?
                If isExpanded -> Show All.
                If Collapsed -> Hide Cart/Profile? 
                User said "show only logo, search, hamburger" for MOBILE.
                For DESKTOP Collapsed: if I hide Cart/Profile, looking for the cart needs hover.
                That's a valid pattern ("Hover to reveal menu").
                Let's hide them on collapsed to match the requested "only logo, search, hamburger" vibe, 
                Assuming Desktop Collapsed is also minimal like Mobile.
            */}
            <div className={`relative transition-all duration-300 ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>
              <NavLink to="/cart" className="flex items-center hover:text-[#A37E2C] transition-colors">
                <BsBag size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* User Profile - Hidden on Collapsed */}
            <div className={`relative group transition-all duration-300 ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>
              {user ? (
                <>
                  <button className="flex items-center hover:text-[#A37E2C] focus:outline-none">
                    <FaUserCircle size={24} />
                  </button>
                  {/* Dropdown - Only show if Expanded obviously */}
                  {isExpanded && (
                    <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 hidden group-hover:block border border-gray-100 dark:border-gray-700 animate-fade-in-up">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 mb-1">
                        Signed in as <br />
                        <span className="font-bold truncate block text-[#135B3A] dark:text-green-400">{user.email}</span>
                      </div>
                      {isAdmin && (
                        <NavLink
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#135B3A]"
                        >
                          {t("admin_dashboard")}
                        </NavLink>
                      )}
                      <button
                        onClick={() => signOut(auth)}
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

            {/* Desktop Hamburger? If expanded, we show links. If collapsed (Desktop), we hide links. 
                 Should we show a hamburger on Desktop Collapsed? 
                 User just said "expand on hover". No explicit request for hamburger on desktop.
                 So on Desktop Collapsed: Logo + Search. Hover -> Full Menu. 
                 This seems consistent with "Island".
             */}
          </div>
        </section>
      </div>

      {/* Mobile-Only Top Strip Alternative if needed? We rely on main strip for Desktop. */}
    </div>
  );
}

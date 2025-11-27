import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import { BsBag } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { ProductContext } from "../Providers/ProductProvider";
import { useAuth } from "../Providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const { cart } = useContext(ProductContext);
  const { user, isAdmin } = useAuth();
  const cartItemCount = cart.length;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-[1rem]">
      <div className="hidden lg:block">
        <section className="bg-secondary flex justify-between p-2 text-white text-sm">
          <p>08143904414</p>
          <p>georgewoodcasket@gmail.com</p>
          <p>
            Follow us and stay updated with the latest community development
            programs;{" "}
            <a
              href="https://www.instagram.com/georgewoodcaskets?igsh=MWttbHNsMmdreHhoNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1 hover:text-primary"
            >
              @georgewoodcaskets
            </a>
          </p>
        </section>
      </div>

      <section className="flex justify-between items-center bg-primary h-16 p-4 leaflet">
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="ml-3 pt-[70px] scale-75" />
        </NavLink>

        <div className="hidden sm:block sm:flex-1 sm:text-center sm:text-white sm:font-bold">
          <h1>George Wood Casket</h1>
        </div>

        <div className="flex items-center">
          {/* Navigation Links */}
          <div className="hidden lg:flex">
            <nav className="w-[60vw] flex justify-evenly text-white font-semibold">
              {[
                { name: "HOME", path: "/" },
                { name: "PRODUCTS", path: "/products" },
                { name: "SERVICES", path: "/services" },
                { name: "ABOUT US", path: "/about-us" },
                { name: "GIVING", path: "/giving" },
                { name: "TRACK ORDER", path: "/track-order" },
                { name: "XCLUSIVE", path: "/xclusive" },
              ].map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  className={({ isActive }) =>
                    `relative pb-1 transition-all ${isActive
                      ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-secondary"
                      : "hover:text-secondary"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Cart Icon with Red Dot */}
          <div className="relative flex items-center pr-5">
            <NavLink to="/cart" className="flex items-center text-white hover:text-secondary transition-colors">
              <BsBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-[-5px] right-[10px] bg-red-500 rounded-full h-2 w-2" />
              )}
            </NavLink>
          </div>

          {/* User Profile / Login */}
          <div className="hidden lg:flex items-center relative">
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-secondary focus:outline-none">
                  <FaUserCircle size={24} />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Signed in as <br />
                    <span className="font-bold truncate block">{user.email}</span>
                  </div>
                  {isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={() => signOut(auth)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white font-semibold hover:text-secondary transition-colors"
              >
                LOGIN
              </NavLink>
            )}
          </div>

          <div className="ml-2 block lg:hidden pr-4">
            <HamburgerMenu />
          </div>
        </div>
      </section>
    </div>
  );
}

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Favicon.svg";
import HamburgerMenu from "./HamburgerMenu";
import CartIcon from "../assets/svgs/cart_svg.svg";
import { ProductContext } from "../Providers/ProductProvider";

export default function Header() {
  const { cart } = useContext(ProductContext);
  const cartItemCount = cart.length;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-[1rem]">
      <div className="hidden lg:block">
        <section className="bg-[#A37E2C] flex justify-between p-2 text-white text-sm">
          <p>08143904414</p>
          <p>georgewoodcasket@gmail.com</p>
          <p>
            Follow us and stay updated with the latest community development
            programs;{" "}
            <a
              href="https://www.instagram.com/georgewoodcaskets?igsh=MWttbHNsMmdreHhoNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1 hover:text-[#135B3A]"
            >
              @georgewoodcaskets
            </a>
          </p>
        </section>
      </div>

      <section className="flex justify-between items-center bg-[#135B3A] h-16 p-4 leaflet">
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
                    `relative pb-1 transition-all ${
                      isActive
                        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#A37E2C]"
                        : "hover:text-[#A37E2C]"
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
            <NavLink to="/cart" className="flex items-center">
              <img src={CartIcon} alt="Cart" />
              {cartItemCount > 0 && (
                <span className="absolute top-[-5px] right-[10px] bg-red-500 rounded-full h-2 w-2" />
              )}
            </NavLink>
          </div>

          <div className="ml-2 block lg:hidden pr-4">
            <HamburgerMenu />
          </div>
        </div>
      </section>
    </div>
  );
}

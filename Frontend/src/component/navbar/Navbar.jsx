import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import { BsCart2, BsPersonCircle } from "react-icons/bs";
import { gsap } from "gsap";
import Search from "../search/Search";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/Store";
import { FaHome, FaPhoneAlt, FaShopify } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";
import { PiSignOutLight } from "react-icons/pi";

const Navbar = ({ setShowSignup }) => {
  const [mobile, setMobile] = useState(false);
  const titleRef = useRef(null);
  const menuRef = useRef(null);
  const iconsRef = useRef(null);
  const menuItemsRef = useRef(null);
  const [search, setSearch] = useState(false);
  const { totalCartItems, token, setToken } = useStoreContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleRef.current) {
      const letters = titleRef.current.childNodes;
      gsap.set(letters, { opacity: 0, y: -30 });

      tl.to(letters, {
        opacity: 1,
        y: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 0.5,
        stagger: 0.1,
      });
    }

    if (menuRef.current) {
      gsap.set(menuRef.current, { opacity: 0, y: -30 });
      tl.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (iconsRef.current) {
      gsap.set(iconsRef.current, { opacity: 0, y: -30 });
      tl.to(iconsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (mobile && menuItemsRef.current) {
      const menuItems = menuItemsRef.current.childNodes;
      gsap.set(menuItems, { opacity: 0, x: -50 });

      gsap.to(menuItems, {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [mobile]);

  const toggleMenu = useCallback(() => {
    setMobile((prev) => !prev);
  }, []);

  return (
    <nav className="bg-[#dee2e6] shadow-md fixed top-0 left-0 right-0 w-full z-10 py-3 md:py-4">
      <Search search={search} setSearch={setSearch} />
      <div className="container">
        <div className="flex items-center justify-between">
          <div ref={menuRef}>
            <CiMenuFries
              className="hover:text-[#3d348b] transition-all text-2xl font-extrabold cursor-pointer"
              onClick={toggleMenu}
              aria-label="Open Menu"
              aria-expanded={mobile}
            />
          </div>

          {mobile && (
            <div className="absolute top-full left-0 flex justify-center h-screen md:w-1/4 w-1/2 z-10">
              <ul
                className="bg-[#eef4ed] text-base font-normal w-full flex flex-col items-center gap-16 pt-3 "
                ref={menuItemsRef}
                role="menu"
              >
                <li
                  role="menuitem"
                  className="pt-5 flex gap-2 items-center hover:text-[#3d348b] group"
                >
                  <FaHome className="text-xl group-hover:scale-125 transition-all ease-in cursor-pointer" />
                  <Link to="/" className="hover:text-[#3d348b] text-base ">
                    Home
                  </Link>
                </li>
                <li
                  role="menuitem"
                  className="flex gap-2 items-center hover:text-[#3d348b] group"
                >
                  <FaShopify className="text-xl group-hover:scale-125 transition-all ease-in" />
                  <Link
                    to="/products"
                    className="hover:text-[#3d348b] text-base "
                  >
                    Shop
                  </Link>
                </li>
                <li
                  role="menuitem"
                  className="flex gap-2 items-center hover:text-[#3d348b] group"
                >
                  <SiPowerpages className="text-xl group-hover:scale-125 transition-all ease-in" />
                  <Link to={"/products"} className="text-base ">
                    Pages
                  </Link>
                </li>
                <li
                  role="menuitem"
                  className="flex gap-2 items-center group hover:text-[#3d348b]"
                >
                  <FaPhoneAlt className="text-xl group-hover:scale-125 hover:text-[#3d348b] transition-all ease-in" />
                  <Link to={"/contact"} className="text-base  ">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <h2
            ref={titleRef}
            className="font-extrabold text-3xl tracking-tighter font-dancing flex-1 text-center"
          >
            {["C", "r", "i", "s", "t", "y"].map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h2>

          <div
            className="flex gap-3 items-center text-2xl font-extrabold text-black"
            ref={iconsRef}
          >
            <div>
              {token ? (
                <div className="relative">
                  <BsPersonCircle
                    className="hover:text-[#3d348b] transition-all ease-in cursor-pointer"
                    onClick={() => setShow(!show)}
                  />
                  {show && (
                    <div className="absolute text-base top-[50px] font-medium rounded-md cursor-pointer w-24 text-center text-white py-4 left-[-20px] bg-slate-400">
                      <span
                        className="mb-4 flex items-center justify-center gap-1 cursor-pointer"
                        onClick={() => {
                          localStorage.removeItem("token");
                          setToken(null);
                          setShowSignup(false);
                          setShow(false);
                        }}
                      >
                        <PiSignOutLight className="text-lg" />
                        Sign Out
                      </span>
                      <p
                        className="text-base"
                        onClick={() => navigate("/myorders")}
                      >
                        My Orders
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <IoPersonOutline
                  className="hover:text-[#3d348b] transition-all ease-in cursor-pointer"
                  aria-label="User Profile"
                  onClick={() => setShowSignup(true)}
                />
              )}
            </div>
            <CiSearch
              className="hover:text-[#3d348b] transition-all ease-in cursor-pointer"
              aria-label="Search"
              onClick={() => setSearch(!search)}
            />
            <div
              className="relative inline-block"
              onClick={() => {
                navigate("/cart");
                window.scrollTo(0, 0);
              }}
            >
              <BsCart2
                className="hover:text-[#3d348b] transition-all ease-in cursor-pointer"
                aria-label="Cart"
              />
              <span className="absolute top-[-9px] right-[-9px] bg-[#03045e] text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {totalCartItems() > 0 ? totalCartItems() : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

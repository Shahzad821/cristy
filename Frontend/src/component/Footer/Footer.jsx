import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">About Cristy </h5>
            <p className="text-sm mb-4">
              Discover unique products and amazing deals at Cristy Shop, your
              go-to destination for all things special!
            </p>
            <div className="flex space-x-4">
              <a className="hover:text-gray-400">Facebook</a>
              <a className="hover:text-gray-400">Instagram</a>
              <a className="hover:text-gray-400">Twitter</a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h5 className="text-lg font-bold mb-2">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/products" className="hover:text-gray-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h5 className="text-lg font-bold mb-2 ">
              Subscribe to Our Newsletter
            </h5>
            <p className="text-sm mb-4">
              Stay updated on our latest products and promotions.
            </p>
            <form className="flex md:flex-wrap lg:flex-nowrap gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 text-black rounded-l-md flex-[80%] "
                required
              />
              <button
                type="submit"
                className="bg-gray-600 p-2 rounded-r-md hover:bg-gray-500 flex-[20%]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cristy Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

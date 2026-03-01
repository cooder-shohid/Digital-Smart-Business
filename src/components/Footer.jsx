import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Smart Digital</h3>
          <p className="text-gray-200 text-sm">
            Leading provider of digital products and services across
            Bangladesh. Quality you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Phone:</strong> +880 1234 567890
          </p>
          <p className="text-sm">
            <strong>Email:</strong> info@smartdigital.com
          </p>
          <p className="text-sm">
            <strong>Address:</strong> 123 Main Street, Dhaka, Bangladesh
          </p>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded mb-2 sm:mb-0 text-black"
            />
            <button
              className="bg-blue-800 px-4 py-2 rounded text-white hover:bg-blue-900"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-200 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-200 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-500 mt-8 pt-4 text-center text-sm text-gray-300">
        © 2026 Smart Digital. All Rights Reserved.
      </div>
    </footer>
  );
}
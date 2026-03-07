import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 ">
      <div className="flex justify-between items-center">
        
        <h1 className="font-bold text-xl">Smart Digital</h1>

        {/* Hamburger Menu Button - Visible on small and medium screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu - Hidden on small and medium screens */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart ({cart.length})
          </Link>
        </div>

        {/* Auth Links - Hidden on small and medium screens */}
        <div className="hidden md:flex space-x-4">
          <Link to="/checkout" className="hover:underline">
            Checkout
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Visible on small and medium screens when toggled */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-blue-700 rounded px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/shop"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart ({cart.length})
          </Link>

          <hr className="border-blue-600 my-2" />

          <Link
            to="/checkout"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Checkout
          </Link>
          <Link
            to="/login"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="block hover:bg-blue-800 px-3 py-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
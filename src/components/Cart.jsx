import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaCartPlus, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  const handleQtyChange = (item, delta) => {
    const newQty = (item.quantity || 1) + delta;
    if (newQty > 0) {
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg relative focus:outline-none hover:bg-blue-700 transition"
      >
        <FaCartPlus />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h4 className="font-semibold text-lg">Cart Items ({cart.length})</h4>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black">
              <FaTimes />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Cart is empty</p>
          ) : (
            <>
              <ul className="space-y-3 max-h-64 overflow-auto">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">৳{(item.price || 0) * (item.quantity || 1)}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleQtyChange(item, -1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-2 font-semibold">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQtyChange(item, 1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaPlus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-3">
                <p className="font-semibold text-lg">
                  Subtotal: <span className="text-blue-600">৳{subtotal.toFixed(2)}</span>
                </p>
              </div>
              <Link
                to="/cart"
                className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setOpen(false)}
              >
                View Full Cart
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
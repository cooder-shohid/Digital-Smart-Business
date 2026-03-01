import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.05;
  const shipping = cart.length ? 50 : 0;
  const validCoupons = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    WELCOME5: 0.05,
  };
  const discountRate = validCoupons[appliedCoupon] || 0;
  const discount = subtotal * discountRate;
  const total = subtotal + tax + shipping - discount;

  const handleQuantity = (item, delta) => {
  const newQty = (item.quantity || 1) + delta;
  if (newQty > 0) {
    updateQuantity(item.id, newQty); // ✅ শুধুমাত্র এই id update হবে
  }
};

  const handleApplyCoupon = () => {
    if (validCoupons[coupon]) {
      setAppliedCoupon(coupon);
      setCouponMsg("✓ Coupon applied successfully!");
      setTimeout(() => setCouponMsg(""), 3000);
    } else {
      setCouponMsg("❌ Invalid coupon code");
      setTimeout(() => setCouponMsg(""), 3000);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setCoupon("");
    setCouponMsg("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <Link to="/shop" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* left - items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold">Quantity</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center space-x-4">
                          <img
                            src={item.image || "https://via.placeholder.com/50"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="font-medium">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-blue-600 font-semibold">৳{item.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded w-fit">
                            <button
                              className="p-2 hover:bg-gray-200 rounded transition"
                              onClick={() => handleQuantity(item, -1)}
                              title="Decrease quantity"
                            >
                              <FaMinus size={12} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity || 1}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0) updateQuantity(item.id, val);
                              }}
                              className="w-12 text-center font-semibold border-none bg-transparent"
                              min="1"
                            />
                            <button
                              className="p-2 hover:bg-gray-200 rounded transition"
                              onClick={() => handleQuantity(item, 1)}
                              title="Increase quantity"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-lg">
                          ৳{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                            title="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 p-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex space-x-4 mb-3">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-blue-600 font-bold">৳{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded">
                        <button
                          className="p-2 hover:bg-gray-300"
                          onClick={() => handleQuantity(item, -1)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) updateQuantity(item.id, val);
                          }}
                          className="w-12 text-center font-semibold border-none bg-transparent"
                          min="1"
                        />
                        <button
                          className="p-2 hover:bg-gray-300"
                          onClick={() => handleQuantity(item, 1)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <p className="font-bold">
                        ৳{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition font-semibold"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>

          {/* right - summary */}
          <div className="w-full lg:w-80">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg sticky top-4">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tax (5%)</span>
                  <span className="font-semibold">৳{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold">৳{shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm bg-green-100 p-2 rounded">
                    <span className="text-green-800">Discount ({discountRate * 100}%)</span>
                    <span className="font-bold text-green-700">-৳{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="bg-white p-4 rounded mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">৳{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <label className="block text-sm font-semibold">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                    placeholder="e.g., SAVE10"
                    disabled={appliedCoupon !== ""}
                  />
                  <button
                    onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                    className={`px-4 py-2 rounded text-white font-semibold transition ${
                      appliedCoupon
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {appliedCoupon ? "Remove" : "Apply"}
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-sm ${couponMsg.includes("✓") ? "text-green-600" : "text-red-600"}`}>
                    {couponMsg}
                  </p>
                )}
                {appliedCoupon && (
                  <p className="text-sm text-green-600 flex items-center space-x-1">
                    <FaCheckCircle /> Coupon {appliedCoupon} applied
                  </p>
                )}
                <p className="text-xs text-gray-600">Valid codes: SAVE10, SAVE20, WELCOME5</p>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

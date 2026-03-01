import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Billing Details</h3>
          <input className="input" placeholder="Full Name" />
          <input className="input mt-2" placeholder="Phone" />
          <input className="input mt-2" placeholder="Address" />
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          {cart.map((item, i) => (
            <p key={i}>{item.name}</p>
          ))}
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
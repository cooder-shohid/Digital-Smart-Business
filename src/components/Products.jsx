import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaStar, FaCartPlus } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 1200,
    image: "https://images.unsplash.com/photo-1722448113450-f6860b7fbfe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdpcmVsZXNzJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    discount: 0,
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: 850,
    image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fExlYXRoZXIlMjBXYWxsZXR8ZW58MHx8MHx8fDA%3D",
    rating: 4.0,
    discount: 0,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 1800,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.7,
    discount: 0,
  },
];

export default function Products() {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our best-selling items
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover hover:scale-105 transition"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{p.name}</h3>

              {/* rating */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(p.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                    size={14}
                  />
                ))}
              </div>

              {/* price */}
              <p className="text-blue-600 font-bold text-xl mb-4">৳{p.price}</p>

              {/* add to cart button */}
              <button
                onClick={() => addToCart(p)}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
              >
                <FaCartPlus /> <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { FaStar, FaHeart, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import {productsData} from "../data/productsData";
// sample product list
export default function ShopPage() {
  // grab methods/state from the shared cart context; this is the
  // same context that Cart.jsx reads later on.  When we call addToCart()
  // the provider will update `cart`, triggering a re‑render of any
  // component (including Cart.jsx) that also uses `CartContext`.
  const { addToCart, cart } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  // main categories & subcategories state
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, maxPrice] = priceRange;
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [addedNotification, setAddedNotification] = useState(null);

  const itemsPerPage = 6;

  // derive unique lists/maps for filters
  const categoriesMap = useMemo(() => {
    const map = {};
    productsData.forEach((p) => {
      if (!map[p.category]) map[p.category] = new Set();
      if (p.subcategory) map[p.category].add(p.subcategory);
    });
    return map; // { category: Set(subcats) }
  }, []);

  // build tags map: { "Category::Subcategory": Set of tags }
  const tagsMap = useMemo(() => {
    const map = {};
    productsData.forEach((p) => {
      const key = `${p.category}::${p.subcategory || "General"}`;
      if (!map[key]) map[key] = new Set();
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach((tag) => map[key].add(tag));
      }
    });
    return map;
  }, []);

  const categories = Object.keys(categoriesMap);
  const brands = [...new Set(productsData.map((p) => p.brand))];

  const filtered = useMemo(() => {
    return productsData
      .filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((p) => {
        // no selection -> pass
        if (!selectedMainCategories.length && !selectedSubcategories.length) return true;
        // main category match
        if (selectedMainCategories.includes(p.category)) return true;
        // subcategory match
        if (p.subcategory && selectedSubcategories.includes(p.subcategory)) return true;
        return false;
      })
      .filter((p) =>
        selectedBrands.length ? selectedBrands.includes(p.brand) : true
      )
      .filter((p) => p.price >= minPrice && p.price <= maxPrice)
      .filter((p) => (ratingFilter ? p.rating >= ratingFilter : true))
      .filter((p) => {
        // tag filtering: if tags are selected, product must have at least one matching tag
        if (!selectedTags.length) return true;
        if (!p.tags) return false;
        return selectedTags.some((tag) => p.tags.includes(tag));
      })
      .sort((a, b) => {
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        if (sortOption === "newest") return b.id - a.id;
        return 0;
      });
  }, [
    searchTerm,
    selectedMainCategories,
    selectedSubcategories,
    selectedTags,
    selectedBrands,
    minPrice,
    maxPrice,
    ratingFilter,
    sortOption,
  ]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleMainCategory = (cat) => {
    setSelectedMainCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  /**
   * called when the user clicks the "Add to Cart" button on a product card
   * - logs to console (helpful for debugging)
   * - invokes `addToCart` from CartContext; that updates the shared state
   *   inside CartProvider
   * - shows a brief notification
   *
   * The CartContext provider lives at the top level of the app (see App.jsx),
   * so CartPage (and the mini-cart badge in Navbar) see the same state.  When
   * `addToCart` mutates it, those consumers re-render automatically.
   * In other words, clicking this button here is what causes the items to
   * appear inside Cart.jsx when you navigate there.
   */
  const handleAddToCart = (product) => {
    console.log("[Shop] adding", product);
    addToCart(product);

    // immediately open mini‑cart so user sees the added item,
    // then close again after a couple seconds just like the notification.
    setShowMiniCart(true);
    setTimeout(() => setShowMiniCart(false), 2000);

    // show a brief feedback notification (same as products component)
    setAddedNotification(product.name);
    setTimeout(() => setAddedNotification(null), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 relative">
      {/* Success Notification */}
      {addedNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-bounce">
          <FaCheckCircle />
          <span>{addedNotification} added to cart!</span>
        </div>
      )}
      {/* sidebar */}
      <aside className="w-full md:w-1/4 mb-8 md:mb-0">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <p className="font-semibold  bg-sky-500 text-white px-2 py-1 rounded">Category</p>
            {categories.map((cat) => (
              <div key={cat} className="mb-2">
                <label className="block text-sm font-medium text-green-700">
                  <input
                    type="checkbox"
                    checked={selectedMainCategories.includes(cat)}
                    onChange={() => toggleMainCategory(cat)}
                    className="mr-2"
                  />
                  {cat}
                </label>
                {/* render subcategories if present */}
                {categoriesMap[cat] && categoriesMap[cat].size > 0 && (
                  <div className="ml-4 mt-1 ">
                    {[...categoriesMap[cat]].map((sub) => {
                      const tagsKey = `${cat}::${sub}`;
                      const subTags = tagsMap[tagsKey];
                      return (
                        <div key={sub} className="mb-1">
                          <label className="block text-sm   text-pink-800 px-2 py-1 rounded">
                            <input
                              type="checkbox"
                              checked={selectedSubcategories.includes(sub)}
                              onChange={() => toggleSubcategory(sub)}
                              className="mr-2"
                            />
                            {sub}
                          </label>
                          {/* render tags if present */}
                          {subTags && subTags.size > 0 && (
                            <div className="ml-4 mt-1  ">
                              {[...subTags].map((tag) => (
                                <label key={tag} className="block text-xs ">
                                  <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                    className=" mr-2 "
                                  />
                                  {tag}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="font-semibold bg-sky-500 text-white px-2 py-1 rounded">Brand</p>
            {brands.map((b) => (
              <label key={b} className="block text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="mr-2"
                />
                {b}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <p className="font-semibold">Price</p>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), maxPrice])
                }
                className="w-1/2 px-2 py-1 border rounded text-sm"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setPriceRange([minPrice, Number(e.target.value)])
                }
                className="w-1/2 px-2 py-1 border rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Rating</p>
            {[5, 4, 3, 2, 1].map((r) => (
              <label key={r} className="block text-sm">
                <input
                  type="radio"
                  name="rating"
                  checked={ratingFilter === r}
                  onChange={() => setRatingFilter(r)}
                  className="mr-2"
                />
                {r} &amp; up
              </label>
            ))}
            <label className="block text-sm">
              <input
                type="radio"
                name="rating"
                checked={ratingFilter === 0}
                onChange={() => setRatingFilter(0)}
                className="mr-2"
              />
              Any
            </label>
          </div>
          <div>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={() => {
                setSelectedMainCategories([]);
                setSelectedSubcategories([]);
                setSelectedTags([]);
                setSelectedBrands([]);
                setPriceRange([0, 5000]);
                setRatingFilter(0);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      {/* main content */}
      <main className="flex-1">
        {/* search & sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col items-start mb-4 md:mb-0 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded w-full md:w-64"
            />
            {searchTerm && (
              <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 z-10">
                {filtered
                  .slice(0, 5)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(p.name);
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-8 h-8 object-cover rounded mr-2"
                      />
                      <span className="text-sm">{p.name}</span>
                    </div>
                  ))}
                {filtered.length === 0 && (
                  <div className="p-2 text-sm text-gray-500">No results</div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-semibold">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-3 py-2 rounded text-sm"
            >
              <option value="">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* products grid - desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginated.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition relative group"
            >
              {/* sale badge */}
              {p.isOnSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
              )}
              {p.isNew && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
              <div className="overflow-hidden rounded">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover transform group-hover:scale-105 transition"
                />
              </div>
              <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-blue-600 font-bold">
                  ৳{p.price - p.discount}
                </p>
                {p.discount > 0 && (
                  <p className="text-sm line-through text-gray-500">
                    ৳{p.price}
                  </p>
                )}
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(p.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              
              <button
                onClick={() => handleAddToCart(p)}
                className="relative z-20 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <FaCartPlus /> <span>Add to Cart</span>
              </button>
              {/* quick actions on hover */}
              {/* the overlay div itself never captures clicks; only the heart button inside should be clickable */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                <button className="bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100 pointer-events-auto">
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* products card view - mobile */}
        <div className="sm:hidden space-y-4">
          {paginated.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* badges */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  {p.isOnSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {p.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
                <button className="text-red-500 hover:text-red-700">
                  <FaHeart />
                </button>
              </div>

              {/* product image */}
              <div className="overflow-hidden rounded-lg mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-cover"
                />
              </div>

              {/* product details */}
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>

              {/* price */}
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-blue-600 font-bold text-xl">
                  ৳{p.price - p.discount}
                </p>
                {p.discount > 0 && (
                  <p className="text-sm line-through text-gray-500">
                    ৳{p.price}
                  </p>
                )}
              </div>

              {/* rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(p.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">({p.rating})</span>
              </div>

              {/* add to cart button - larger for mobile */}
              <button
                onClick={() => handleAddToCart(p)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 font-bold"
              >
                <FaCartPlus size={18} /> <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="mt-8 flex justify-center items-center space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded border ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </main>

      {/* mini cart floating icon */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg relative"
          onClick={() => setShowMiniCart((v) => !v)}
        >
          <FaCartPlus />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
        {showMiniCart && (
          <div className="mt-2 w-64 bg-white shadow-lg rounded p-4">
            <h4 className="font-semibold mb-2">Cart Items</h4>
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Cart is empty</p>
            ) : (
              <ul className="space-y-2 max-h-40 overflow-auto">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>৳{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
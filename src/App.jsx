import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/Contact";
import ServicesPage from "./pages/Services";
import ShopPage from "./pages/Shop";
import CartPage from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import ServiceOrderPage from "./pages/ServiceOrderPage";
import OrderSuccess from "./pages/OrderSuccess";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-order" element={<ServiceOrderPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
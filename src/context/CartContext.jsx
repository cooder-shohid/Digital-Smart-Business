import { createContext, useState, useCallback } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Update quantity
  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  // Add item to cart
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      console.log("[CartContext] addToCart called with", product);
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Increase quantity if already exists
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        console.log("[CartContext] cart updated (increment quantity)", updated);
        return updated;
      } else {
        const newCart = [...prev, { ...product, quantity: 1 }];
        console.log("[CartContext] cart updated (added new item)", newCart);
        return newCart;
      }
    });
  }, []);

  // Remove item
  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products.js';

const StoreContext = createContext(null);
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('stylekart-cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('stylekart-wishlist', []));
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem('stylekart-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('stylekart-wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__stylekartToastTimer);
    window.__stylekartToastTimer = window.setTimeout(() => setToast(''), 2400);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }];
    });
    notify(`${product.name} added to cart`);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  };
  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
    notify('Item removed from cart');
  };
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist((current) => exists ? current.filter((id) => id !== product.id) : [...current, product.id]);
    notify(exists ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wishlistProducts = useMemo(() => products.filter((product) => wishlist.includes(product.id)), [wishlist]);

  const value = {
    cart, wishlist, wishlistProducts, cartCount, cartTotal, toast,
    addToCart, updateQuantity, removeFromCart, toggleWishlist, notify,
    clearCart: () => setCart([])
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
};
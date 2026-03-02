import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getSessionId, Product, CartItem } from '../lib/supabase';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('session_id', sessionId);

    setCartItems(data || []);
  };

  const addToCart = async (productId: string) => {
    const sessionId = getSessionId();

    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + 1 })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('cart_items')
        .insert({ session_id: sessionId, product_id: productId, quantity: 1 });
    }

    await refreshCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    await supabase.from('cart_items').delete().eq('id', cartItemId);
    await refreshCart();
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId);

    await refreshCart();
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    await supabase.from('cart_items').delete().eq('session_id', sessionId);
    await refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

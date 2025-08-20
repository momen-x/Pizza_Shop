"use client";
import { createContext, useState, useContext, ReactNode } from "react";
// import { ExtraIngredients, ProductSizes } from "@prisma/client";

export type Size = {
  id: string;
  name: string;
  price: number;
};

export type Extra = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity: number; // Make this required, not optional
  size: Size;
  extras: Extra[];
};

interface CartContextType {
  deliveryFee: number;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  getTotalItems: () => number;
  getSubTotal: () => number;
  getTotalAmount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartItems");
      try {
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size.name === newItem.size.name &&
          JSON.stringify(item.extras.map((e) => e.name).sort()) ===
            JSON.stringify(newItem.extras.map((e) => e.name).sort())
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity,
        };
        console.log("Updated cart: >>", updatedCart); // Debug log
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));

        return updatedCart;
      } else {
        // Add new item to cart
        const updatedCart = [...prevCart, newItem];
        console.log("New cart:", updatedCart); // Debug log
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));

        return updatedCart;
      }
    });
  };

  const removeItemFromCart = (id: string) => {
    const cart1 = [...cart];
    const newCart = cart1.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return getSubTotal() + deliveryFee;
  };

  const getSubTotal = () => {
    return cart.reduce((total, cartItem) => {
      const extrasTotal = cartItem.extras?.reduce(
        (sum, extra) => sum + (extra.price || 0),
        0
      );

      const itemTotal =
        cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0);

      return total + itemTotal * cartItem.quantity!;
    }, 0);
  };

  const deliveryFee = 5;
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getTotalItems,
        removeItemFromCart,
        deliveryFee,
        getSubTotal,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

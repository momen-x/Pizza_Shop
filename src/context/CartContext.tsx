"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { ExtraIngredients, ProductSizes } from "@prisma/client";

export type Size = {
  id: string;
  name: ProductSizes;
  price: number;
};

export type Extra = {
  id: string;
  name: ExtraIngredients;
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
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  getTotalItems: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    console.log("Adding to cart:", newItem); // Debug log

    setCart((prevCart) => {
      // Check if item with same configuration exists
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
        console.log("Updated cart:", updatedCart); // Debug log
        return updatedCart;
      } else {
        // Add new item to cart
        const updatedCart = [...prevCart, newItem];
        console.log("New cart:", updatedCart); // Debug log
        return updatedCart;
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, getTotalItems }}
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

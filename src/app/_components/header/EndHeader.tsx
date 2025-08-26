"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import Link from "../Link/Link";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/Server/logoutOnServeer";
// import { logout } from "@/actions/logout"; // Import your server action

interface Props {
  isLogin: boolean;
  name?: string;
}

const EndHeader = (props: Props) => {
  const { cart, getTotalItems } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuantity(getTotalItems());
  }, [cart, getTotalItems]);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      // Call the server action to delete the cookie
      await logout();
      
      // Redirect to login page and refresh
      router.push("/login");
      router.refresh(); // This will trigger a re-render with updated auth state
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Login/Logout Button */}
      {props.isLogin ? (
        <>
          <Button 
            onClick={handleLogout} 
            disabled={isLoggingOut}
            variant="outline"
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
          <Link href={"/profile"} className="text-sm font-medium hover:underline">
            {props.name}
          </Link>
        </>
      ) : (
        <Link href="/login">
          <Button variant="outline" className="flex items-center gap-2">
            <FiUser className="h-4 w-4" />
            Login
          </Button>
        </Link>
      )}

      {/* Shopping Cart */}
      <Link href="/cart" className="relative cursor-pointer">
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <CiShoppingCart className="h-6 w-6" />
          {quantity > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {quantity}
            </Badge>
          )}
        </Button>
      </Link>

      {/* Theme Toggle */}
      <ModeToggle />
    </div>
  );
};

export default EndHeader;
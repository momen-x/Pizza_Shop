"use client";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
// import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import Link from "../Link/Link";

const EndHeader = () => {
  const { cart, getTotalItems } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  // const [lang, setLang] = useState({ language: "English", direction: "ltr" });

  useEffect(() => {
    setQuantity(getTotalItems());
  }, [cart, getTotalItems]);

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Language Selector */}


      {/* Login Button */}
      <Link href="/login">
        <Button variant="outline" className="flex items-center gap-2">
          <FiUser className="h-4 w-4" />
          Login
        </Button>
      </Link>

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

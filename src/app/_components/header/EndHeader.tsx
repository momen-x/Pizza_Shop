// app/_components/header/EndHeader.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "@/app/_components/Link/Link";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const EndHeader = () => {
  const { cart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [lang, setLang] = useState({ language: "English", direction: "ltr" });

  useEffect(() => {
    const qua = cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setQuantity(qua);
  }, [cart]); // Use cart as dependency, not cart.length

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1">
            {lang.language}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setLang({ language: "English", direction: "rtl" })}
            className="cursor-pointer"
          >
            العربية
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLang({ language: "العربية", direction: "ltr" })}
            className="cursor-pointer"
          >
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

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
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const EndHeader = () => {
  return (
    <div className="flex items-center gap-2.5 p-4 ">
      <Link href={"/login"}>
        <Button className="bg-orange-400 rounded-2xl hover:bg-amber-100 hover:text-black">
          login
        </Button>
      </Link>
      {/* Language */}
      <DropdownMenu>
        <DropdownMenuTrigger>العربية</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>عربية</DropdownMenuItem>
          <DropdownMenuItem>English</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* ==language== */}
      {/* Icon */}
      <Link href={"/cart"}>
        <CiShoppingCart />
      </Link>
      {/* ==Icon== */}
      {/* Cart */}
      {/* ==Icon== */}
      {/* Mood */}
      <ModeToggle />
      {/* ==Mood ==*/}
    </div>
  );
};

export default EndHeader;

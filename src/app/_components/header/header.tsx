import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import EndHeader from "./EndHeader";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyTokenForPage";
import { tokenName } from "@/utils/tokenName";

const Header = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get(tokenName);

  const payload = verifyTokenForPage(token?.value || "");
  const isAdmin = payload?.isAdmin || false;
  const isLogin = payload !== null ? true : false;
  const name = payload?.name;

  return (
    <header className=" shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-between items-center w-screen">
          {/* Logo - Always visible */}
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation - Hidden on tablet and mobile */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Navbar isAdmin={isAdmin} />
            </div>

            {/* EndHeader and Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <EndHeader isLogin={isLogin} name={name} />

              {/* Mobile/Tablet menu button - Only the button, not full navbar */}
            </div>
          </div>
          <div className="lg:hidden">
            <Navbar isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import EndHeader from "./EndHeader";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Navbar - Hidden on mobile (handled inside Navbar component) */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* EndHeader - Visible on all screens */}
          <div className="ml-4 flex items-center md:ml-6">
            <EndHeader />
          </div>

          {/* Mobile navbar toggle is now inside Navbar component */}
          <div className="-mr-2 flex md:hidden">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
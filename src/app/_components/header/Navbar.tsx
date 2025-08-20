"use client";

import Link from "../Link/Link";
import {
  BiSolidFoodMenu,
  BiSolidContact,
  BiMenu,
  BiX,
  BiHome,
} from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { useState, useEffect } from "react";

interface Page {
  path: string;
  label: string;
  icons?: React.ReactNode;
}

const pages: Page[] = [
  { path: "/", label: "Home", icons: <BiHome /> },
  { path: "/menu", label: "Menu", icons: <BiSolidFoodMenu /> },
  { path: "/contact", label: "Contact", icons: <BiSolidContact /> },
  { path: "/about", label: "About", icons: <FcAbout /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex">
            <ul className="flex items-center space-x-4">
              {pages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={page.path}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="mr-2">{page.icons}</span>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  href={page.path}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 block"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">{page.icons}</span>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

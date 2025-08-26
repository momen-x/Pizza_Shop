"use client";

import Link from "../Link/Link";
import {
  BiSolidFoodMenu,
  BiSolidContact,
  BiMenu,
  BiX,
  BiHome,
} from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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

const AdminPage = {
  path: "/Admin",
  label: "Admin",
  icons: <GrUserAdmin />,
};

interface IProps {
  isAdmin: boolean;
}

const Navbar = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActivePage = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="relative">
      {/* Mobile/Tablet menu button - Only visible on mobile and tablet */}
      <div className="lg:hidden">
        <Button
          onClick={toggleMenu}
          className="dark:bg-gray-900 bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <BiX size={24} /> : <BiMenu size={24}  />}
        </Button>

        {/* Mobile/Tablet menu overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity">
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  aria-label="Close menu"
                >
                  <BiX size={20} />
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="px-4 py-6 space-y-1">
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.path}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActivePage(page.path)
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 dark:border-orange-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-xl">{page.icons}</span>
                    {page.label}
                  </Link>
                ))}
                
                {props.isAdmin && (
                  <Link
                    href={AdminPage.path}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActivePage(AdminPage.path)
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 dark:border-orange-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-xl">{AdminPage.icons}</span>
                    {AdminPage.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop menu - Only visible on large screens */}
      <div className="hidden lg:block">
        <ul className="flex items-center space-x-1">
          {pages.map((page, index) => (
            <li key={index} className="relative">
              <Link
                href={page.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePage(page.path)
                    ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{page.icons}</span>
                {page.label}
              </Link>

              {/* Active page indicator */}
              {isActivePage(page.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-3/4 bg-orange-600 dark:bg-orange-400 rounded-t-full"></div>
              )}
            </li>
          ))}
          
          {props.isAdmin && (
            <li className="relative">
              <Link
                href={AdminPage.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePage(AdminPage.path)
                    ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{AdminPage.icons}</span>
                {AdminPage.label}
              </Link>

              {isActivePage(AdminPage.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-3/4 bg-orange-600 dark:bg-orange-400 rounded-t-full"></div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">
          © 2025 Pizza Shop. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-orange-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-orange-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-orange-400 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
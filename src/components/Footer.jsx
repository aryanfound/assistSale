// src/components/Footer.jsx
import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">SoftSell</h3>
            <p className="text-gray-400 mt-1">Software Resale Solutions</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-300 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-blue-300 transition duration-300">Contact Us</a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} SoftSell. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
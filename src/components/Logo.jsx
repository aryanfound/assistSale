// src/components/Logo.jsx
import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl mr-2">SS</div>
      <span className="font-bold text-xl text-gray-800 dark:text-white">SoftSell</span>
    </div>
  );
}
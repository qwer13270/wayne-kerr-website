'use client';

import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navigation({ darkMode, setDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic color variables
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`backdrop-blur-xl border rounded-full py-3 px-6 shadow-2xl transition-colors duration-300 ${
          darkMode 
            ? 'bg-white/5 border-white/20' 
            : 'bg-white/55 border-white/60'
        }`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/">
                <img
                  src="/images/logo/logo.webp"
                  alt="Wayne Kerr Logo"
                  className={`h-5 w-auto transition-all duration-300 ${darkMode ? 'brightness-0 invert' : ''}`}
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a 
                href="/" 
                className={`transition-colors text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Home
              </a>
              <a 
                href="/about" 
                className={`transition-colors text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                About
              </a>
              <a 
                href="#" 
                className={`transition-colors text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Products
              </a>
              <a 
                href="#" 
                className={`transition-colors text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Support
              </a>
              <a 
                href="#" 
                className={`transition-colors text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Countries
              </a>
            </div>

            {/* Right Side - Dark Mode Toggle + Get Quote Button */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="text-yellow-400" size={20} />
                ) : (
                  <Moon className="text-gray-600" size={20} />
                )}
              </button>

              {/* Get Quote Button */}
              <button className="btn-gradient hover:bg-gray-100 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg">
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className={textColor} size={28} />
              ) : (
                <Menu className={textColor} size={28} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`lg:hidden pt-4 mt-4 border-t space-y-3 ${
              darkMode ? 'border-white/10' : 'border-gray-900/10'
            }`}>
              <a 
                href="/" 
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                Home
              </a>
              <a 
                href="/about" 
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                About
              </a>
              <a 
                href="#" 
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                Products
              </a>
              <a 
                href="#" 
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                Support
              </a>
              <a 
                href="#" 
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                Countries
              </a>
              
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 py-2 font-medium"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              
              <button className="bg-white hover:bg-gray-100 text-black w-full px-6 py-3 rounded-full font-medium transition-colors shadow-lg">
                Get Quote
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
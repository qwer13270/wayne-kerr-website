'use client';

import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import globalLocations from '../../../data/globalLocations.json';
import NavDropdown from './NavDropdown';
import MobileNavDropdown from './MobileNavDropdown';


export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [countriesMenuOpen, setCountriesMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  // Dynamic color variables
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const navSurfaceStyles = isDark
    ? 'bg-white/5 border-white/20'
    : 'bg-white/55 border-white/60';
  const navItemStyles = isDark
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-700 hover:text-gray-900';

  // Dropdown menu items
  const productsItems = [
    { label: 'Instruments', href: '#' },
    { label: 'Accessories', href: '#' },
    { label: 'Softwares', href: '#' },
  ];

  type GlobalLocation = { name: string; left: string; top: string };
  const countriesItems = (globalLocations as GlobalLocation[]).map((location) => ({
    label: location.name,
    href: '#',
  }));

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`backdrop-blur-xl border rounded-full py-3 px-6 shadow-2xl transition-colors duration-300 ${navSurfaceStyles}`}>
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/">
                  <img
                    src="/images/logo/logo.webp"
                    alt="Wayne Kerr Logo"
                    className={`h-5 w-auto transition-all duration-300 ${isDark ? 'brightness-0 invert' : ''}`}
                  />
                </a>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                <a
                  href="/"
                  className={`transition-colors text-sm font-medium ${navItemStyles}`}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className={`transition-colors text-sm font-medium ${navItemStyles}`}
                >
                  About
                </a>

                {/* Products Dropdown */}
                <NavDropdown
                  label="Products"
                  items={productsItems}
                  isOpen={productsMenuOpen}
                  onToggle={setProductsMenuOpen}
                  navItemStyles={navItemStyles}
                  navSurfaceStyles={navSurfaceStyles}
                />

                <a
                  href="#"
                  className={`transition-colors text-sm font-medium ${navItemStyles}`}
                >
                  Support
                </a>

                {/* Countries Dropdown */}
                <NavDropdown
                  label="Countries"
                  items={countriesItems}
                  isOpen={countriesMenuOpen}
                  onToggle={setCountriesMenuOpen}
                  navItemStyles={navItemStyles}
                  navSurfaceStyles={navSurfaceStyles}
                />
              </div>

              {/* Right Side - Dark Mode Toggle + Get Quote Button */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
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
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`lg:hidden mt-4 rounded-3xl border p-6 space-y-3 shadow-2xl ${navSurfaceStyles}`}>
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

              {/* Mobile Products Dropdown */}
              <MobileNavDropdown
                label="Products"
                items={productsItems}
                isOpen={mobileProductsOpen}
                onToggle={() => setMobileProductsOpen(!mobileProductsOpen)}
                textColor={textColor}
              />

              <a
                href="#"
                className={`block py-2 ${textColor} hover:text-blue-600 font-medium`}
              >
                Support
              </a>

              {/* Mobile Countries Dropdown */}
              <MobileNavDropdown
                label="Countries"
                items={countriesItems}
                isOpen={mobileCountriesOpen}
                onToggle={() => setMobileCountriesOpen(!mobileCountriesOpen)}
                textColor={textColor}
              />

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="flex items-center gap-2 py-2 font-medium"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
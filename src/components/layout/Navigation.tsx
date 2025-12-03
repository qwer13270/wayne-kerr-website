'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target as Node)
      ) {
        setProductsMenuOpen(false);
      }
    }

    if (productsMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [productsMenuOpen]);

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
                <div
                  className="relative"
                  ref={productsMenuRef}
                  onMouseEnter={() => setProductsMenuOpen(true)}
                  onMouseLeave={() => setProductsMenuOpen(false)}
                >
                  <button
                    className={`flex items-center gap-2 text-sm font-medium ${navItemStyles}`}
                    style={{ transition: 'color 5ms ease-in-out' }}
                    aria-haspopup="true"
                    aria-expanded={productsMenuOpen}
                  >
                    Products
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${productsMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Invisible bridge to keep menu open */}
                  <div className="absolute left-0 right-0 h-8 top-full" />

                  <div
                    className={`absolute left-0 top-full z-50 mt-8 w-56 rounded-2xl border p-3 shadow-2xl transition-opacity transition-transform duration-200 ease-in-out ${navSurfaceStyles} ${
                      productsMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    {[
                      { label: 'Instruments', href: '#' },
                      { label: 'Accessories', href: '#' },
                      { label: 'Softwares', href: '#' },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`block rounded-xl px-4 py-2 text-sm font-medium transition-colors ${navItemStyles}`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href="#"
                  className={`transition-colors text-sm font-medium ${navItemStyles}`}
                >
                  Support
                </a>
                <a
                  href="#"
                  className={`transition-colors text-sm font-medium ${navItemStyles}`}
                >
                  Countries
                </a>
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
              <div>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className={`flex items-center justify-between w-full py-2 ${textColor} hover:text-blue-600 font-medium`}
                >
                  Products
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileProductsOpen && (
                  <div className="pl-4 pt-2 space-y-2">
                    {[
                      { label: 'Instruments', href: '#' },
                      { label: 'Accessories', href: '#' },
                      { label: 'Softwares', href: '#' },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`block py-2 text-sm ${textColor} hover:text-blue-600`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

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
"use client";

import React, { useState } from "react";
import Link from "next/link"; // ← Import Link
import { Menu, X, Sun, Moon, Gauge, Wrench, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import globalLocations from "../../../data/globalLocations.json";
import NavDropdown from "./NavDropdown";
import MobileNavDropdown from "./MobileNavDropdown";
import {
  NAV_ITEM_STYLES,
  NAV_SURFACE_STYLES,
  DROPDOWN_SURFACE_STYLES,
  TEXT_PRIMARY,
} from "@/src/styles/styles";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [countriesMenuOpen, setCountriesMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Dropdown menu items
  const productsItems = [
    { label: "Instruments", href: "/products/instruments", icon: Gauge },
    { label: "Accessories", href: "/products/accessories", icon: Wrench },
    { label: "Softwares", href: "/products/softwares", icon: Code2 },
  ];

  type GlobalLocation = {
    name: string;
    link: string;
  };
  const countriesItems = Array.from(
    new Map(
      (globalLocations as GlobalLocation[]).map((location) => [
        location.name.trim(),
        { label: location.name.trim(), href: location.link },
      ])
    ).values()
  );

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
          <div
            className={`backdrop-blur-xl border rounded-full py-3 px-6 shadow-2xl transition-colors duration-300 ${NAV_SURFACE_STYLES}`}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <img
                    src="/images/logo/logo.webp"
                    alt="Wayne Kerr Logo"
                    className="h-5 w-auto transition-all duration-300 dark:brightness-0 dark:invert"
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/"
                  className={`transition-colors text-sm font-medium ${NAV_ITEM_STYLES}`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors text-sm font-medium ${NAV_ITEM_STYLES}`}
                >
                  About
                </Link>

                {/* Products Dropdown */}
                <NavDropdown
                  label="Products"
                  items={productsItems}
                  isOpen={productsMenuOpen}
                  onToggle={setProductsMenuOpen}
                  navItemStyles={NAV_ITEM_STYLES}
                  navSurfaceStyles={DROPDOWN_SURFACE_STYLES}
                />

                <Link
                  href="/support"
                  className={`transition-colors text-sm font-medium ${NAV_ITEM_STYLES}`}
                >
                  Support
                </Link>

                {/* Countries Dropdown */}
                <NavDropdown
                  label="Countries"
                  items={countriesItems}
                  isOpen={countriesMenuOpen}
                  onToggle={setCountriesMenuOpen}
                  navItemStyles={NAV_ITEM_STYLES}
                  navSurfaceStyles={DROPDOWN_SURFACE_STYLES}
                />
              </div>

              {/* Right Side - Dark Mode Toggle + Get Quote Button */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className={`p-2 rounded-full transition-colors ${
                    resolvedTheme === "dark"
                      ? "hover:bg-white/10"
                      : "hover:bg-gray-900/10"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="text-yellow-400" size={20} />
                  ) : (
                    <Moon className="text-gray-600" size={20} />
                  )}
                </button>

                {/* Contact Us Button */}
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg">
                  <Link href="/contact">Contact Us</Link>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className={TEXT_PRIMARY} size={28} />
                ) : (
                  <Menu className={TEXT_PRIMARY} size={28} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden mt-4 rounded-3xl border p-6 space-y-3 shadow-2xl ${NAV_SURFACE_STYLES}`}
            >
              <Link
                href="/"
                className={`block py-2 ${TEXT_PRIMARY} hover:text-blue-600 font-medium`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block py-2 ${TEXT_PRIMARY} hover:text-blue-600 font-medium`}
              >
                About
              </Link>

              {/* Mobile Products Dropdown */}
              <MobileNavDropdown
                label="Products"
                items={productsItems}
                isOpen={mobileProductsOpen}
                onToggle={() => setMobileProductsOpen(!mobileProductsOpen)}
                textColor={TEXT_PRIMARY}
              />

              <Link
                href="/support"
                className={`block py-2 ${TEXT_PRIMARY} hover:text-blue-600 font-medium`}
              >
                Support
              </Link>

              {/* Mobile Countries Dropdown */}
              <MobileNavDropdown
                label="Countries"
                items={countriesItems}
                isOpen={mobileCountriesOpen}
                onToggle={() => setMobileCountriesOpen(!mobileCountriesOpen)}
                textColor={TEXT_PRIMARY}
              />

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="flex items-center gap-2 py-2 font-medium"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                  <span className="text-sm">
                    {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

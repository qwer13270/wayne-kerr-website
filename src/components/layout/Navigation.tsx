"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Gauge, Wrench, Code2, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import globalLocations from "../../../data/globalLocations.json";
import NavDropdown from "./NavDropdown";
import MobileNavDropdown from "./MobileNavDropdown";
import LanguageSwitcher from "@/src/components/LanguageSwitcher";
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

  // Get translations
  const t = useTranslations("navigation");
  const tCountries = useTranslations("countries");

  // Dropdown menu items with translations
  const productsItems = [
    { label: t("instruments"), href: "/products/instruments", icon: Gauge },
    { label: t("accessories"), href: "/products/accessories", icon: Wrench },
    { label: t("softwares"), href: "/products/softwares", icon: Code2 },
  ];

  type GlobalLocation = {
    name: string;
    link: string;
  };

  // Map country names to translated versions
  const countriesItems = Array.from(
    new Map(
      (globalLocations as GlobalLocation[]).map((location) => {
        const countryKey = location.name.trim().toLowerCase();
        // Try to get translation, fallback to original name
        let translatedName;
        try {
          translatedName = tCountries(countryKey);
        } catch {
          translatedName = location.name.trim();
        }

        return [
          location.name.trim(),
          { label: translatedName, href: location.link },
        ];
      })
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
                  {t("home")}
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors text-sm font-medium ${NAV_ITEM_STYLES}`}
                >
                  {t("about")}
                </Link>

                {/* Products Dropdown */}
                <NavDropdown
                  label={t("products")}
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
                  {t("support")}
                </Link>

                {/* Countries Dropdown */}
                <NavDropdown
                  label={t("countries")}
                  items={countriesItems}
                  isOpen={countriesMenuOpen}
                  onToggle={setCountriesMenuOpen}
                  navItemStyles={NAV_ITEM_STYLES}
                  navSurfaceStyles={DROPDOWN_SURFACE_STYLES}
                />
              </div>

              {/* Right Side - Language + Dark Mode Toggle + Contact Button */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Language Switcher */}
                <div className="relative">
                  <LanguageSwitcher />
                </div>

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
                <Link href="/contact">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg">
                    {t("contact")}
                  </button>
                </Link>
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
                {t("home")}
              </Link>
              <Link
                href="/about"
                className={`block py-2 ${TEXT_PRIMARY} hover:text-blue-600 font-medium`}
              >
                {t("about")}
              </Link>

              {/* Mobile Products Dropdown */}
              <MobileNavDropdown
                label={t("products")}
                items={productsItems}
                isOpen={mobileProductsOpen}
                onToggle={() => setMobileProductsOpen(!mobileProductsOpen)}
                textColor={TEXT_PRIMARY}
              />

              <Link
                href="/support"
                className={`block py-2 ${TEXT_PRIMARY} hover:text-blue-600 font-medium`}
              >
                {t("support")}
              </Link>

              {/* Mobile Countries Dropdown */}
              <MobileNavDropdown
                label={t("countries")}
                items={countriesItems}
                isOpen={mobileCountriesOpen}
                onToggle={() => setMobileCountriesOpen(!mobileCountriesOpen)}
                textColor={TEXT_PRIMARY}
              />

              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={20} className={TEXT_PRIMARY} />
                  <span className={`text-sm font-medium ${TEXT_PRIMARY}`}>
                    Language
                  </span>
                </div>
                <LanguageSwitcher />
              </div>

              {/* Mobile Dark Mode Toggle */}
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

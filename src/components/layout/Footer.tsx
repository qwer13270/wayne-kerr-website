"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
export default function Footer() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const backgroundClass = isDark
    ? "bg-black text-white"
    : "bg-white text-gray-900";
  const sectionText = isDark ? "text-gray-400" : "text-gray-600";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";
  const linkColors = isDark
    ? "text-gray-400 hover:text-white"
    : "text-gray-600 hover:text-gray-900";

  return (
    <footer className={`${backgroundClass} py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="/images/logo/logo.webp"
              alt="Wayne Kerr Logo"
              className={`h-5 w-auto mb-4 ${
                isDark ? "brightness-0 invert" : ""
              }`}
            />
            <p className={sectionText}>
              Leaders in precision component measurement since 1946
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              {["Instruments", "Accessories", "Softwares"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/${item.toLowerCase()}`}
                    className={`transition-colors ${linkColors}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {["About", "Support", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`transition-colors ${linkColors}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <Phone size={16} /> +1 234 567 8900
              </li>
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <Mail size={16} /> info@waynekerr.com
              </li>
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <MapPin size={16} /> Global Locations
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${borderClass} pt-8 text-center ${sectionText}`}
        >
          <p>&copy; 2024 Wayne Kerr Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const { theme } = useTheme();
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");

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
            <p className={sectionText}>{t("tagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("products")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/products/instruments"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("instruments")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/accessories"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("accessories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/softwares"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("softwares")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("support")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`transition-colors ${linkColors}`}
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <Phone size={16} /> {t("phone")}
              </li>
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <Mail size={16} /> {t("email")}
              </li>
              <li className={`flex items-center gap-2 ${sectionText}`}>
                <MapPin size={16} /> {t("locations")}
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${borderClass} pt-8 text-center ${sectionText}`}
        >
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}

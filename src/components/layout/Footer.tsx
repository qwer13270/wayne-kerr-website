"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BORDER_STYLES, TEXT_SECONDARY } from "@/src/styles/styles";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");

  return (
    <footer className={`py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="/images/logo/logo.webp"
              alt="Wayne Kerr Logo"
              className={`h-5 w-auto mb-4 dark:brightness-0 dark:invert`}
            />
            <p className={`${TEXT_SECONDARY}`}>{t("tagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("products")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/products/instruments"
                  className={`transition-colors ${TEXT_SECONDARY}`}
                >
                  {tNav("instruments")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/accessories"
                  className={`transition-colors ${TEXT_SECONDARY}`}
                >
                  {tNav("accessories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/softwares"
                  className={`transition-colors ${TEXT_SECONDARY}`}
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
                  className={`transition-colors ${TEXT_SECONDARY}`}
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className={`transition-colors ${TEXT_SECONDARY}`}
                >
                  {tNav("support")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`transition-colors ${TEXT_SECONDARY}`}
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li className={`flex items-center gap-2 ${TEXT_SECONDARY}`}>
                <Phone size={16} /> {t("phone")}
              </li>
              <li className={`flex items-center gap-2 ${TEXT_SECONDARY}`}>
                <Mail size={16} /> {t("email")}
              </li>
              <li className={`flex items-center gap-2 ${TEXT_SECONDARY}`}>
                <MapPin size={16} /> {t("locations")}
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${BORDER_STYLES} pt-8 text-center`}>
          <p className={`${TEXT_SECONDARY}`}>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}

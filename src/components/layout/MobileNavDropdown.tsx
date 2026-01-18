"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/request";

interface MobileNavDropdownProps {
  label: string;
  items: Array<{
    label: string;
    href: string;
    switchLocale?: Locale;
    isLanguageSwitch?: boolean;
  }>;
  isOpen: boolean;
  onToggle: () => void;
  textColor: string;
  onLanguageSwitch?: (locale: Locale) => void;
}

export default function MobileNavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  textColor,
  onLanguageSwitch,
}: MobileNavDropdownProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full py-2 ${textColor} hover:text-blue-600 font-medium`}
      >
        {label}
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="pl-4 pt-2 space-y-2">
          {items.map((item) => {
            const isExternal =
              item.href.startsWith("http://") ||
              item.href.startsWith("https://");
            const isLanguageSwitch =
              item.isLanguageSwitch && item.switchLocale && onLanguageSwitch;

            // Handle language switching
            if (isLanguageSwitch && item.switchLocale && onLanguageSwitch) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onLanguageSwitch(item.switchLocale!);
                    onToggle();
                  }}
                  className={`block py-2 text-sm w-full text-left ${textColor} hover:text-blue-600`}
                >
                  {item.label}
                </button>
              );
            }

            // Regular link
            return (
              <Link
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                className={`block py-2 text-sm ${textColor} hover:text-blue-600`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
